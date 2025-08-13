// src/components/classes/Calendar.tsx
import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../styles/Classes.css";
import ApiHandler from "../../utils/ApiHandler";

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

export default function Calendar({ events }: Props) {
  // Use events from props if provided; otherwise fetch from DB
  const [dbEvents, setDbEvents] = useState<AdminCalendarEvent[] | null>(null);
  const shouldUsePropEvents = Boolean(events && events.length > 0);

  useEffect(() => {
    if (shouldUsePropEvents) return;

    let mounted = true;
    (async () => {
      try {
        const raw = await ApiHandler.getAdminClasses(); // GET /classes?gym_id=...
        console.log("Fetched classes from DB:", raw);

        const mapped: AdminCalendarEvent[] = (raw || []).map((r: any) => {
          // Supports:
          // - r.start / r.end (ISO or epoch)
          // - r.date + r.start_time / r.end_time ("YYYY-MM-DD", "HH:mm")
          // - r.date + r.durationMinutes (fallback)
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
        console.error("Failed to load classes from DB:", e);
        if (mounted) setDbEvents([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [shouldUsePropEvents]);

  // Source of truth for the calendar
  const sourceEvents = useMemo<AdminCalendarEvent[]>(() => {
    if (shouldUsePropEvents) return events!;
    return dbEvents ?? [];
  }, [events, dbEvents, shouldUsePropEvents]);

  // Map to FullCalendar events
  const fcEvents = useMemo(
    () =>
      sourceEvents.map((e) => ({
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
    [sourceEvents]
  );

  return (
    <div style={{ margin: "10px" }}>
      <h1>Classes</h1>

      <div className="classes-calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={fcEvents}
          /* Month layout: variable weeks, fills the screen, neighbor days visible */
          fixedWeekCount={false}
          showNonCurrentDates={true}
          expandRows={true}
          height="100%"
          dayMaxEventRows={3}
          /* 12-hour time (AM/PM) */
          eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------ helpers ------------------------------ */
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
  const [hh, mm] = timeStr.split(":").map((n: string) => Number(n));
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
