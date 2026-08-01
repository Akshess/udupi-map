import Link from "next/link";
import EventCard from "@/features/events/EventCard";
import { events } from "./data/events";
import { CATEGORY_LABELS, CATEGORY_ICONS } from "@/features/events/types/event";

export default function EventsPage() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="mt-2 text-gray-600">
            Walks, cleanup drives and cultural events happening around Udupi.
            Show up, get counted, and earn points.
          </p>
        </div>

        <Link
          href="/events/new"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + Create Event
        </Link>
      </div>

      {/* Category legend */}
      <div className="mt-6 flex flex-wrap gap-3">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <span
            key={key}
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-gray-600"
          >
            {CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS]} {label}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {sortedEvents.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed p-12 text-center text-gray-500">
          No events yet. Be the first to organize a walk or cleanup drive in
          your ward.
        </div>
      )}
    </main>
  );
}
