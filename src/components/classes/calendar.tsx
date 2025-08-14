// src/components/classes/Calendar.tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventClickArg } from "@fullcalendar/core";
import Alert from "react-bootstrap/Alert";
import Modal from "../Modal/Modal";
import { ColorLegend } from "./Legend";
import "../../styles/Classes.css";
import ApiHandler from "../../utils/ApiHandler";

/** ---------------- Types ---------------- */
export type AdminCalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  canceled?: boolean;
  capacity?: number;
  attendees?: number;
  instructor?: string;
  room?: string;
};

type Props = { events?: AdminCalendarEvent[] };

type MemberClass = {
  id: string;
  title: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:mm
  maxCapacity: number;
  attendees: number;
  waitlist: number; // count only
};

/** ---------------- Role helpers ---------------- */
const getRole = () => (localStorage.getItem("role") || "").toLowerCase();
const isAdminOrTrainer = () => {
  const r = getRole();
  return r === "admin" || r === "trainer";
};

/** ---------------- Component ---------------- */
export default function Calendar({ events }: Props) {
  const roleIsAdmin = isAdminOrTrainer();

  /** ===== ADMIN/TRAINER (read-only calendar) ===== */
  const [dbEvents, setDbEvents] = useState<AdminCalendarEvent[] | null>(null);
  const shouldUsePropEvents = Boolean(events && events.length > 0);

  useEffect(() => {
    if (!roleIsAdmin) return;        // admin-only fetch
    if (shouldUsePropEvents) return; // parent provided events

    let mounted = true;
    (async () => {
      try {
        const raw = await ApiHandler.getAdminClasses(); // GET /classes?gym_id=...
        const mapped: AdminCalendarEvent[] = (raw || []).map((r: any) => {
          const dateLike = r.date ?? r.startDate ?? r.start_date;
          const start = r.start
            ? new Date(r.start)
            : combineDateAndTime(dateLike, r.start_time ?? r.startTime);
          const end = r.end
            ? new Date(r.end)
            : (r.end_time ?? r.endTime)
              ? combineDateAndTime(dateLike, r.end_time ?? r.endTime)
              : new Date(start.getTime() + ((r.durationMinutes ?? 60) * 60_000));
          return {
            id: String(r.id ?? r._id ?? makeId()),
            title: String(r.title ?? r.name ?? "Class"),
            start,
            end,
            canceled: Boolean(r.canceled ?? r.isCanceled),
            capacity: typeof r.capacity === "number" ? r.capacity : r.maxCapacity ?? undefined,
            attendees:
              typeof r.attendees === "number"
                ? r.attendees
                : Array.isArray(r.attendees)
                ? r.attendees.length
                : r.enrolledCount,
            instructor: r.instructor ?? r.trainer ?? undefined,
            room: r.room ?? undefined,
          };
        });
        if (mounted) setDbEvents(mapped);
      } catch (e) {
        console.error("Failed to load classes from DB (admin):", e);
        if (mounted) setDbEvents([]);
      }
    })();
    return () => { mounted = false; };
  }, [roleIsAdmin, shouldUsePropEvents]);

  const adminSourceEvents = useMemo<AdminCalendarEvent[]>(() => {
    if (!roleIsAdmin) return [];
    if (shouldUsePropEvents) return events!;
    return dbEvents ?? [];
  }, [roleIsAdmin, events, dbEvents, shouldUsePropEvents]);

  const adminFcEvents = useMemo(
    () =>
      adminSourceEvents.map((e) => ({
        id: e.id,
        title:
          typeof e.capacity === "number" && typeof e.attendees === "number"
            ? `${e.title} (${e.attendees}/${e.capacity})`
            : e.title,
        start: e.start,
        end: e.end,
        color: e.canceled
          ? "gray"
          : (e.attendees ?? 0) >= (e.capacity ?? Number.MAX_SAFE_INTEGER)
          ? "red"
          : "green",
        extendedProps: { kind: "admin", ...e },
      })),
    [adminSourceEvents]
  );

  /** ===== MEMBER (interactive calendar) ===== */
  const [classes, setClasses] = useState<MemberClass[]>([]);
  const [userClasses, setUserClasses] = useState<MemberClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<MemberClass | null>(null);
  const [modalMode, setModalMode] = useState<"signup" | "waitlist" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "warning" | "info">("success");
  const [showAlert, setShowAlert] = useState(false);
  const gymId = localStorage.getItem("gym_id") || "";

  // --- unified mapping helper for both endpoints ---
  const mapToMemberClass = (cls: any): MemberClass => ({
    id: cls._id ?? cls.id,
    title: cls.title,
    date: String(cls.date ?? "").split("T")[0],
    time: cls.start_time ?? cls.time ?? "00:00",
    maxCapacity: Number(cls.capacity ?? cls.maxCapacity ?? 0),
    attendees: Number(
      typeof cls.attendees === "number"
        ? cls.attendees
        : Array.isArray(cls.attendees)
        ? cls.attendees.length
        : 0
    ),
    waitlist: Number(cls.waitlistCount ?? 0),
  });

  // --- robust fetch with fallback so calendar still shows when gym_id is missing or the route differs ---
  const fetchClassesData = async () => {
    try {
      let list: any[] = [];

      // Primary: /classes/gym/:gymId
      if (gymId) {
        try {
          const data = await ApiHandler.get(`/classes/gym/${gymId}`);
          list = data?.allClasses ?? [];
        } catch (e) {
          console.warn("GET /classes/gym/:gymId failed, will try fallback:", e);
        }
      }

      // Fallback: admin-style list (ApiHandler.getAdminClasses handles query shape)
      if (list.length === 0) {
        try {
          const adminList = await ApiHandler.getAdminClasses(); // /classes?gym_id=...
          list = Array.isArray(adminList) ? adminList : (adminList?.data ?? []);
        } catch (e) {
          console.error("Fallback getAdminClasses failed:", e);
        }
      }

      setClasses(list.map(mapToMemberClass));
    } catch (err: any) {
      console.error("❌ Failed to fetch classes:", err?.message || err);
    }
  };

  const fetchUserClassesData = async () => {
    try {
      const data = await ApiHandler.get("/classes/userClasses"); // requires auth
      const list = data?.userClasses ?? [];
      setUserClasses(list.map(mapToMemberClass));
    } catch (err) {
      // If this fails (401, etc.), don’t block the main calendar
      console.warn("Failed to fetch user classes (non-fatal):", err);
      setUserClasses([]);
    }
  };

  useEffect(() => {
    if (roleIsAdmin) return; // admin uses admin flow only
    fetchClassesData();
    fetchUserClassesData();
  }, [roleIsAdmin, gymId]);

  const userClassIds = useMemo(() => new Set(userClasses.map((c) => c.id)), [userClasses]);

  const memberFcEvents = useMemo(() => {
    const available = classes
      .filter((c) => !userClassIds.has(c.id))
      .map((cls) => ({
        id: cls.id,
        title: `${cls.title} (${cls.attendees}/${cls.maxCapacity})`,
        start: `${cls.date}T${cls.time}`,
        extendedProps: { kind: "member", ...cls },
        color: cls.attendees >= cls.maxCapacity ? "red" : "green",
      }));

    const mine = userClasses.map((cls) => ({
      id: `user-${cls.id}`,
      title: `✔ My Class: ${cls.title}`,
      start: `${cls.date}T${cls.time}`,
      extendedProps: { kind: "member", ...cls },
      color: "#2563EB",
    }));

    return [...available, ...mine];
  }, [classes, userClasses, userClassIds]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const props: any = clickInfo.event.extendedProps;
    const kind = props?.kind;

    if (roleIsAdmin || kind === "admin") {
      return; // Admin calendar is read-only in this component
    }

    const cls: MemberClass = props as MemberClass;
    setSelectedClass(cls);
    setModalMode(
      userClassIds.has(cls.id)
        ? "signup" // already booked; allow leaving from modal
        : cls.attendees >= cls.maxCapacity
        ? "waitlist"
        : "signup"
    );
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setModalMode(null);
  };

  const handleModalSubmit = async () => {
    if (!selectedClass) return;
    const userId = localStorage.getItem("email");
    if (!userId) return;

    try {
      await ApiHandler.post(`/classes/${selectedClass.id}/join`, { user_id: userId });
      await fetchClassesData();
      await fetchUserClassesData();
      setAlertMessage("Successfully joined!");
      setAlertVariant("success");
      setShowAlert(true);
    } catch (err: any) {
      setAlertMessage(err?.response?.data?.error || "Failed to join class.");
      setAlertVariant("danger");
      setShowAlert(true);
    }

    handleModalClose();
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleLeaveClass = async () => {
    if (!selectedClass) return;
    const userId = localStorage.getItem("email");
    if (!userId) return;

    try {
      await ApiHandler.post(`/classes/${selectedClass.id}/leave`, { user_id: userId });
      await fetchClassesData();
      await fetchUserClassesData();
      setAlertMessage("You have left the class.");
      setAlertVariant("info");
      setShowAlert(true);
    } catch (err: any) {
      setAlertMessage(err?.response?.data?.error || "Failed to leave class.");
      setAlertVariant("danger");
      setShowAlert(true);
    }

    handleModalClose();
    setTimeout(() => setShowAlert(false), 3000);
  };

  /** ===== Final event source ===== */
  const fcEvents = roleIsAdmin ? adminFcEvents : memberFcEvents;

  return (
    <div style={{ margin: "10px" }}>
      <h1>Classes</h1>
      <ColorLegend />

      <div className="classes-calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={fcEvents}
          eventClick={handleEventClick}
          eventDidMount={(info) => {
            info.el.style.cursor = roleIsAdmin ? "default" : "pointer";
            info.el.style.whiteSpace = "normal";
            info.el.style.wordBreak = "break-word";
          }}
          fixedWeekCount={false}
          showNonCurrentDates={true}
          expandRows={true}
          height="100%"
          dayMaxEventRows={3}
          eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
        />
      </div>

      {!roleIsAdmin && (
        <>
          <Modal
            isOpen={!!selectedClass && !!modalMode}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            onLeave={userClassIds.has(selectedClass?.id ?? "") ? handleLeaveClass : undefined}
            mode={modalMode || "signup"}
            classTitle={selectedClass?.title || ""}
            waitlistLength={selectedClass?.waitlist ?? 0}
          />
          {showAlert && (
            <div className="alert-overlay">
              <div className="alert-wrapper">
                <Alert
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {alertMessage}
                </Alert>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** ---------------- Helpers ---------------- */
function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function toDate(dateLike: any): Date {
  if (!dateLike) return new Date();
  const d = new Date(dateLike);
  if (!isNaN(d.getTime())) return d;
  if (typeof dateLike === "string") {
    const m = dateLike.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  return new Date();
}

function combineDateAndTime(dateLike: any, timeStr?: string): Date {
  const base = toDate(dateLike);
  if (!timeStr) return base;
  const [hh, mm] = String(timeStr).split(":").map((n: string) => Number(n));
  return new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    isFinite(hh) ? hh : 0,
    isFinite(mm) ? mm : 0,
    0,
    0
  );
}
