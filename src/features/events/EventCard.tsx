import Link from "next/link";
import {
  UdupiEvent,
  CATEGORY_LABELS,
  CATEGORY_STYLES,
  CATEGORY_ICONS,
} from "@/features/events/types/event";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function EventCard({ event }: { event: UdupiEvent }) {
  const spotsLeft =
    event.capacity !== undefined
      ? Math.max(event.capacity - event.attendeeCount, 0)
      : undefined;

  return (
    <Link
      href={`/events/${event.id}`}
      className="block rounded-2xl border bg-white p-6 shadow transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              CATEGORY_STYLES[event.category]
            }`}
          >
            {CATEGORY_ICONS[event.category]} {CATEGORY_LABELS[event.category]}
          </span>

          <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>

          <p className="mt-1 text-sm text-gray-500">
            📍 {event.ward} · {formatDate(event.date)} · {event.time}
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          +{event.points} pts
        </div>
      </div>

      <p className="mt-4 text-gray-600">{event.description}</p>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{event.attendeeCount} attending</span>
        {spotsLeft !== undefined && (
          <span>
            {spotsLeft > 0 ? `${spotsLeft} spots left` : "Fully booked"}
          </span>
        )}
      </div>
    </Link>
  );
}
