import Link from "next/link";

export default function StoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-bold">Stories</h1>

      <p className="mt-6 text-xl text-gray-600">
        Real stories from people who live, work, and walk in Udupi.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/stories/our-story"
          className="group rounded-2xl border bg-white p-8 shadow transition-shadow hover:shadow-md"
        >
          <span className="text-3xl">📖</span>
          <h2 className="mt-4 text-xl font-semibold group-hover:text-teal-800">
            Our Story
          </h2>
          <p className="mt-2 text-gray-600">
            Learn about the Go Udupi project — why it exists and what we&apos;re
            building together.
          </p>
        </Link>

        <Link
          href="/stories/your-story"
          className="group rounded-2xl border bg-white p-8 shadow transition-shadow hover:shadow-md"
        >
          <span className="text-3xl">✍️</span>
          <h2 className="mt-4 text-xl font-semibold group-hover:text-teal-800">
            Your Story
          </h2>
          <p className="mt-2 text-gray-600">
            Share a story about a vendor, a walk, a cleanup drive, or a moment
            that captures something true about your ward.
          </p>
        </Link>
      </div>
    </main>
  );
}
