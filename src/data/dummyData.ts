
interface ClassEvent {
  id?: string;
  title?: string;
  date?: string;
  time?: string;
  maxCapacity?: number;
  attendees?: number;
  waitlist?: string[];
};

interface UserEvent extends ClassEvent { 
  userId: string;
  backgroundColor: string;
  borderColor: string
}

export const initialClasses: ClassEvent[] = [
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
    waitlist: [],
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

export const userEvents: UserEvent[] = [
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
