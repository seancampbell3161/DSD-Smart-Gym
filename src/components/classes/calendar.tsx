/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Modal from "../Modal/Modal";
import Alert from "react-bootstrap/Alert";
import "../../styles/Classes.css";
import type { EventClickArg } from "@fullcalendar/core";
import ApiHandler from "../../utils/ApiHandler";
import { ColorLegend } from "./Legend";


interface ClassEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  maxCapacity: number;
  attendees: number;
  waitlist: number; // now a number, not an array
}

export default function Calendar() {
  const [classes, setClasses] = useState<ClassEvent[]>([]);
  const [userClasses, setUserClasses] = useState<ClassEvent[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassEvent | null>(null);
  const [modalMode, setModalMode] = useState<"signup" | "waitlist" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "warning" | "info">("success");
  const [showAlert, setShowAlert] = useState(false);
  const gymId = localStorage.getItem("gym_id");

  // Reusable fetch functions
  const fetchClassesData = async () => {
    if (!gymId) return;
    try {
      const data = await ApiHandler.get(`/classes/gym/${gymId}`);
      const formatted = data.allClasses.map((cls: any) => ({
        id: cls._id,
        title: cls.title,
        date: cls.date.split("T")[0],
        time: cls.start_time,
        maxCapacity: cls.capacity,
        attendees: cls.attendees,
        waitlist: cls.waitlistCount ?? 0,
      }));
      setClasses(formatted);
    } catch (err: any) {
      console.error("❌ Failed to fetch classes:", err.message);
    }
  };


  const fetchUserClassesData = async () => {
    try {
      const data = await ApiHandler.get("/classes/userClasses");
      const formatted = data.userClasses.map((cls: any) => ({
        id: cls._id,
        title: cls.title,
        date: cls.date.split("T")[0],
        time: cls.start_time,
        maxCapacity: cls.capacity,
        attendees: cls.attendees,
        waitlist: cls.waitlistCount ?? 0,
      }));
      setUserClasses(formatted);
    } catch (err) {
      console.error("Failed to fetch user classes:", err);
    }
  };

  useEffect(() => {
    fetchClassesData();
    fetchUserClassesData();
  }, []);

  const userClassIds = new Set(userClasses.map((cls) => cls.id));

  const calendarEvents = [
    ...classes
      .filter((cls) => !userClassIds.has(cls.id))
      .map((cls) => ({
        id: cls.id,
        title: `${cls.title} (${cls.attendees}/${cls.maxCapacity})`,
        date: `${cls.date}T${cls.time}`,
        extendedProps: cls,
        color: cls.attendees >= cls.maxCapacity ? "red" : "green",
      })),
    ...userClasses.map((cls) => ({
      id: `user-${cls.id}`,
      title: `✔ My Class: ${cls.title}`,
      date: `${cls.date}T${cls.time}`,
      extendedProps: cls,
      color: "#2563EB",
    })),
  ];


  const handleEventClick = (clickInfo: EventClickArg) => {
    const cls: ClassEvent = clickInfo.event.extendedProps;
    setSelectedClass(cls);

    setModalMode(userClassIds.has(cls.id)
      ? "signup" // user is already booked, can leave
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

  return (
    <div style={{ margin: "10px" }}>
      <h1>Classes</h1>
      <ColorLegend />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends
        events={calendarEvents}
        eventClick={handleEventClick}
        eventDidMount={(info) => {
          info.el.style.cursor = "pointer";
          info.el.style.whiteSpace = "normal";
          info.el.style.wordBreak = "break-word";
        }}
      />

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
    </div>
  );
}
