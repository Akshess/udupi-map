"use client";

import { useState } from "react";

const STORY_CATEGORIES = [
  { value: "vendor", label: "🏪 Local Vendor" },
  { value: "walk-cycle", label: "🚶 Walk / Cycling" },
  { value: "cleanup", label: "🧹 Cleanup / Civic" },
  { value: "history", label: "🕰️ Local History" },
  { value: "student", label: "🎓 Student Life" },
  { value: "other", label: "✨ Something Else" },
];

const WARDS = ["Malpe", "Manipal", "Udupi Town", "Kaup", "Santhekatte", "Other"];

export default function YourStory() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up to backend once storage is ready
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Thank you 🙏</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your story has been submitted for review. Once approved, it&apos;ll
          appear on your ward&apos;s page for others to read.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-5xl font-bold">Share Your Story</h1>
      <p className="mt-6 text-xl text-gray-600">
        You know Udupi better than any website does. Tell us about a
        vendor, a walk, a cleanup, or a moment that says something true
        about your ward.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border bg-white p-8 shadow">
        {/* title, category, ward, story textarea, optional photo, submit button */}
      </form>
    </main>
  );
}