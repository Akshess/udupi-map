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
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Story title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g. The chai stall that never closed"
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-300"
          />
        </div>

        {/* Category */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Category</span>
          <div className="flex flex-wrap gap-2">
            {STORY_CATEGORIES.map((cat) => (
              <label
                key={cat.value}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 has-[:checked]:border-teal-400 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-800"
              >
                <input type="radio" name="category" value={cat.value} className="sr-only" required />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        {/* Ward */}
        <div>
          <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
            Ward / neighbourhood
          </label>
          <select
            id="ward"
            name="ward"
            required
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-300"
          >
            <option value="">Select a ward…</option>
            {WARDS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* Story */}
        <div>
          <label htmlFor="story" className="block text-sm font-medium text-gray-700">
            Your story
          </label>
          <textarea
            id="story"
            name="story"
            required
            rows={6}
            placeholder="Write in any language — Kannada, Tulu, English, or a mix…"
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-300"
          />
        </div>

        {/* Optional photo */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="mt-1.5 w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-teal-800 hover:file:bg-teal-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-900"
        >
          Submit story
        </button>
      </form>
    </main>
  );
}
