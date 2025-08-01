import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "../Modal/modal";

interface ClassEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  maxCapacity?: number;
  attendees?: number;
  waitlist?: string[];
};

interface UserEvent extends ClassEvent { 
  userId: string;
  backgroundColor: string;
  borderColor: string
}

const initialClasses: ClassEvent[] = [
  {
    id: "1",
    title: "Cycling",
    date: "2025-07-17",
    time: "08:00",
    maxCapacity: 12,
    attendees: 6,
    waitlist: [],
  },
  {
    id: "2",
    title: "Yoga",
    date: "2025-07-17",
    time: "10:00",
    maxCapacity: 10,
    attendees: 4,
    waitlist: [],
  },
  {
    id: "3",
    title: "Boxing",
    date: "2025-07-17",
    time: "12:00",
    maxCapacity: 8,
    attendees: 8,
    waitlist: ["User1"],
  },
  {
    id: "4",
    title: "HIIT",
    date: "2025-07-17",
    time: "18:00",
    maxCapacity: 15,
    attendees: 14,
    waitlist: [],
  },
  {
    id: "5",
    title: "Strength Training",
    date: "2025-07-17",
    time: "19:30",
    maxCapacity: 10,
    attendees: 10,
    waitlist: ['user 5'],
  },

  {
    id: "6",
    title: "Yoga",
    date: "2025-07-18",
    time: "09:00",
    maxCapacity: 10,
    attendees: 5,
    waitlist: [],
  },
  {
    id: "7",
    title: "Cycling",
    date: "2025-07-18",
    time: "11:00",
    maxCapacity: 12,
    attendees: 12,
    waitlist: ["User2"],
  },
  {
    id: "8",
    title: "Strength Training",
    date: "2025-07-18",
    time: "17:00",
    maxCapacity: 10,
    attendees: 3,
    waitlist: [],
  },
  {
    id: "9",
    title: "HIIT",
    date: "2025-07-18",
    time: "18:30",
    maxCapacity: 15,
    attendees: 15,
    waitlist: ["User3", "User4"],
  },

  {
    id: "10",
    title: "Boxing",
    date: "2025-07-19",
    time: "08:30",
    maxCapacity: 8,
    attendees: 7,
    waitlist: [],
  },
  {
    id: "11",
    title: "Yoga",
    date: "2025-07-19",
    time: "10:30",
    maxCapacity: 10,
    attendees: 10,
    waitlist: ["User5"],
  },
  {
    id: "12",
    title: "Cycling",
    date: "2025-07-19",
    time: "13:00",
    maxCapacity: 12,
    attendees: 11,
    waitlist: [],
  },
  {
    id: "13",
    title: "Strength Training",
    date: "2025-07-19",
    time: "17:00",
    maxCapacity: 10,
    attendees: 9,
    waitlist: [],
  },
  {
    id: "14",
    title: "HIIT",
    date: "2025-07-19",
    time: "18:30",
    maxCapacity: 15,
    attendees: 15,
    waitlist: ["User6"],
  },
];

const userEvents: UserEvent[] = [
  {
    id: 'u1',
    title: '✔ My Class: HIIT',
    date: '2025-07-17',
    time: "18:00",
    userId: 'u2',
    backgroundColor: '#10b981',
    borderColor: '#10b981'
  },
  {
    id: 'u2',
    title: '✔ My Class: Strength Training',
    date: '2025-07-18',
     time: "17:00",
    userId: 'u2',
    backgroundColor: '#10b981',
    borderColor: '#10b981'
  }
];

console.log(userEvents)


export default function Calendar() {
  const [classes, setClasses] = useState<ClassEvent[]>(initialClasses);
  const [selectedClass, setSelectedClass] = useState<ClassEvent | null>(null);
  const [modalMode, setModalMode] = useState<"signup" | "waitlist" | null>(null);

  const calendarEvents = classes.map((cls) => ({
    id: cls.id,
    title: `${cls.title} (${cls.attendees}/${cls.maxCapacity})`,
    date: `${cls.date}T${cls.time}`,
    extendedProps: cls,
    color: cls.attendees >= cls.maxCapacity ? "red" : "green",
  }));

  const userClasses = userEvents.map((usr) => ({
    id: usr.id,
    title: `${usr.title}`,
    date: `${usr.date}T${usr.time}`,
    extendedProps: usr,
    color: usr.attendees >= usr.maxCapacity ? "red" : "green",
  }));

  const handleEventClick = (clickInfo: EventClickArg) => {
    const cls: ClassEvent = clickInfo.event.extendedProps;
    setSelectedClass(cls);
    setModalMode(cls.attendees >= cls.maxCapacity ? "waitlist" : "signup");
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setModalMode(null);
  };

  const handleModalSubmit = (name: string) => {
    if (!selectedClass) return;

    if (modalMode === "signup") {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === selectedClass.id && item.attendees! < item.maxCapacity!
            ? { ...item, attendees: item.attendees! + 1 }
            : item
        )
      );
      alert("You are registered!");
    } else if (modalMode === "waitlist") {
      const existingClass = classes.find((cls) => cls.id === selectedClass.id);
      if (!existingClass) return;

      const isAlreadyOnWaitlist = existingClass.waitlist?.includes(name);

      if (isAlreadyOnWaitlist) {
        const position = existingClass.waitlist?.indexOf(name)! + 1;
        alert(`You are already on the waitlist.\nYour position: #${position}`);
      } else {
        setClasses((prev) =>
          prev.map((item) =>
            item.id === selectedClass.id
              ? { ...item, waitlist: [...(item.waitlist || []), name] }
              : item
          )
        );
        alert(`${name} has been added to the waitlist.`);
      }
    }

    handleModalClose();
  };

  return (
    <div style={{
      margin: '10px',
    }}>
      <h1>Classes</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[...calendarEvents, ...userClasses]}
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
        mode={modalMode || "signup"}
        classTitle={selectedClass?.title || ""}
        waitlistLength={selectedClass?.waitlist?.length || 0}
        />
    </div>
  );
}