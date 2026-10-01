export type Genre =
  | "Drama"
  | "Comedy"
  | "Documentary"
  | "Thriller"
  | "Sport"
  | "Kids"
  | "News"
  | "Live";

export interface ContentItem {
  id: number;
  title: string;
  genre: Genre;
  meta: string;
  badge?: string;
  artIndex: number;
  synopsis?: string;
}

export const CATALOG: ContentItem[] = [
  { id: 1, title: "Harborline", genre: "Drama", meta: "S1 · 10 episodes", badge: "New", artIndex: 0, synopsis: "A dockworker's family unravels a decade-old harbor scandal that reaches the top of city hall." },
  { id: 2, title: "Lower Rooftops", genre: "Comedy", meta: "S2 · 8 episodes", artIndex: 1 },
  { id: 3, title: "Wide Open Veld", genre: "Documentary", meta: "Movie · 94 min", artIndex: 2 },
  { id: 4, title: "Static & Gold", genre: "Drama", meta: "S1 · 6 episodes", badge: "New", artIndex: 3 },
  { id: 5, title: "The Night Market", genre: "Thriller", meta: "Movie · 108 min", artIndex: 4 },
  { id: 6, title: "Coastal Districts", genre: "Documentary", meta: "S1 · 5 episodes", artIndex: 5 },
  { id: 7, title: "Paper Lanterns", genre: "Drama", meta: "Movie · 101 min", artIndex: 1 },
  { id: 8, title: "Second Kickoff", genre: "Sport", meta: "S3 · 12 episodes", artIndex: 2 },
  { id: 9, title: "Studio 4B", genre: "Comedy", meta: "S1 · 10 episodes", badge: "New", artIndex: 3 },
  { id: 10, title: "Dust & Static", genre: "Thriller", meta: "Movie · 97 min", artIndex: 4 },
  { id: 11, title: "Morning Edition", genre: "News", meta: "Daily · 30 min", artIndex: 0 },
  { id: 12, title: "The Long Season", genre: "Sport", meta: "S4 · 16 episodes", artIndex: 5 },
  { id: 13, title: "Rooibos & Rain", genre: "Documentary", meta: "Movie · 86 min", artIndex: 1 },
  { id: 14, title: "Back Row Kids", genre: "Kids", meta: "S2 · 20 episodes", artIndex: 2 },
  { id: 15, title: "Frequency 10", genre: "Drama", meta: "S1 · 8 episodes", artIndex: 3 },
];

export interface EPGEntry {
  title: string;
  time: string;
  desc: string;
}

export interface Channel {
  id: string;
  name: string;
  initials: string;
  artIndex: number;
  now: EPGEntry;
  next: EPGEntry;
}

export const CHANNELS: Channel[] = [
  {
    id: "c1",
    name: "SH One",
    initials: "S1",
    artIndex: 0,
    now: { title: "Harborline", time: "20:00 – 21:00", desc: "A dockworker's family unravels a decade-old harbor scandal." },
    next: { title: "Evening Report", time: "21:00 – 21:30", desc: "The day's top stories from across the region." },
  },
  {
    id: "c2",
    name: "SH News",
    initials: "SN",
    artIndex: 1,
    now: { title: "Morning Edition", time: "19:30 – 20:00", desc: "Rolling coverage of national and local headlines." },
    next: { title: "Market Close", time: "20:00 – 20:15", desc: "A wrap of the day's trading session." },
  },
  {
    id: "c3",
    name: "SH Sport",
    initials: "SS",
    artIndex: 2,
    now: { title: "The Long Season, Ep 9", time: "19:45 – 21:15", desc: "Matchday coverage continues with post-match analysis." },
    next: { title: "Second Kickoff", time: "21:15 – 22:00", desc: "Highlights from the weekend fixtures." },
  },
  {
    id: "c4",
    name: "SH Kids",
    initials: "SK",
    artIndex: 5,
    now: { title: "Back Row Kids, Ep 14", time: "19:00 – 19:30", desc: "The gang builds a treehouse radio station." },
    next: { title: "Story Time", time: "19:30 – 20:00", desc: "A nightly wind-down of short illustrated tales." },
  },
];
