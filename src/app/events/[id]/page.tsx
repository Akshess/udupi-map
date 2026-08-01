import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById, events } from "@/features/events/data/events";
import {
  CATEGORY_LABELS,
  CATEGORY_STYLES,
  CATEGORY_ICONS,
} from "@/features/events/types/event";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const spotsLeft =
    event.capacity !== undefined
      ? Math.max(event.capacity - event.attendeeCount, 0)
      : undefined;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/events" className="text-sm text-blue-600 hover:underline">
        ← Back to Events
      </Link>

      <div className="mt-4 rounded-2xl border bg-white p-8 shadow">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            CATEGORY_STYLES[event.category]
          }`}
        >
          {CATEGORY_ICONS[event.category]} {CATEGORY_LABELS[event.category]}
        </span>

        <h1 className="mt-4 text-3xl font-bold">{event.title}</h1>

        <div className="mt-4 grid grid-cols-1 gap-4 text-gray-600 sm:grid-cols-2">
          <p>📍 {event.location}</p>
          <p>🏘️ {event.ward} ward</p>
          <p>📅 {formatDate(event.date)}</p>
          <p>🕒 {event.time}</p>
        </div>

        <p className="mt-6 text-gray-700">{event.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 p-4">
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            +{event.points} pts for verified attendance
          </div>
          <span className="text-sm text-gray-500">
            Organized by {event.organizer}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-6">
          <div className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {event.attendeeCount}
            </span>{" "}
            attending
            {spotsLeft !== undefined && (
              <span>
                {" "}
                ·{" "}
                {spotsLeft > 0
                  ? `${spotsLeft} spots left`
                  : "Fully booked"}
              </span>
            )}
          </div>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            RSVP
          </button>
        </div>
      </div>
    </main>
  );
}
