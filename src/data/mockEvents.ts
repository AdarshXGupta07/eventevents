export const mockEvents = [
  {
    id: "1",
    title: "React & Next.js Workshop",
    description: "Learn modern React development with hooks, context, and Next.js framework. Build a full-stack application from scratch with hands-on coding.",
    date: "2024-01-15",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub, Room 201",
    category: "Tech",
    attendees: 24,
    maxAttendees: 30,
    organizer: "Tech Society",
    isRegistered: false
  },
  {
    id: "2",
    title: "Cultural Night 2024",
    description: "A spectacular evening celebrating diverse cultures with performances, food, and traditional arts from around the world.",
    date: "2024-01-20",
    time: "6:00 PM - 10:00 PM",
    location: "Main Auditorium",
    category: "Cultural",
    attendees: 145,
    maxAttendees: 200,
    organizer: "Cultural Committee",
    isRegistered: true
  },
  {
    id: "3",
    title: "Annual Basketball Tournament",
    description: "Inter-college basketball championship with exciting matches, prizes, and team spirit. Register your team now!",
    date: "2024-01-25",
    time: "9:00 AM - 6:00 PM",
    location: "Sports Complex",
    category: "Sports",
    attendees: 89,
    maxAttendees: 100,
    organizer: "Sports Club",
    isRegistered: false
  },
  {
    id: "4",
    title: "AI & Machine Learning Summit",
    description: "Explore the latest trends in artificial intelligence with industry experts and hands-on workshops on ML algorithms.",
    date: "2024-02-01",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Center",
    category: "Tech",
    attendees: 67,
    maxAttendees: 75,
    organizer: "AI Research Lab",
    isRegistered: false
  },
  {
    id: "5",
    title: "Photography Exhibition",
    description: "Stunning visual stories captured by talented student photographers. Featuring nature, portrait, and street photography.",
    date: "2024-02-05",
    time: "11:00 AM - 8:00 PM",
    location: "Art Gallery",
    category: "Cultural",
    attendees: 34,
    maxAttendees: 150,
    organizer: "Photography Club",
    isRegistered: false
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Young entrepreneurs present their innovative ideas to industry judges for a chance to win funding and mentorship.",
    date: "2024-02-10",
    time: "1:00 PM - 6:00 PM",
    location: "Business Incubator",
    category: "Tech",
    attendees: 48,
    maxAttendees: 50,
    organizer: "Entrepreneurship Cell",
    isRegistered: true
  }
];

export const mockUser = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@university.edu",
  role: "student" as 'organizer' | 'student',
  registeredEvents: ["2", "6"]
};