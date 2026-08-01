export type EventCategory =
  | "cleanup"
  | "walk"
  | "cycling"
  | "cultural"
  | "workshop";

export interface UdupiEvent {
  id: string;
  title: string;
  category: EventCategory;
  ward: string;
  date: string; // ISO date, e.g. "2026-08-09"
  time: string; // e.g. "6:30 AM"
  location: string;
  description: string;
  organizer: string;
  points: number; // points awarded to verified attendees
  attendeeCount: number;
  capacity?: number;
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  cleanup: "Cleanup Drive",
  walk: "Walk",
  cycling: "Cycling",
  cultural: "Cultural",
  workshop: "Workshop",
};

export const CATEGORY_STYLES: Record<EventCategory, string> = {
  cleanup: "bg-green-100 text-green-700",
  walk: "bg-blue-100 text-blue-700",
  cycling: "bg-orange-100 text-orange-700",
  cultural: "bg-purple-100 text-purple-700",
  workshop: "bg-yellow-100 text-yellow-700",
};

export const CATEGORY_ICONS: Record<EventCategory, string> = {
  cleanup: "🧹",
  walk: "🚶",
  cycling: "🚲",
  cultural: "🎭",
  workshop: "🛠️",
};
