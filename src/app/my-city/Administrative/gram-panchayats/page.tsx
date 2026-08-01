"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { udupiPanchayats } from "@/features/gram-panchayat/data/panchayats";

const TALUKS = ["All", "Udupi", "Karkala", "Kundapura"] as const;

export default function PanchayatsPage() {
  const [search, setSearch] = useState("");
  const [taluk, setTaluk] = useState<(typeof TALUKS)[number]>("All");

  const filtered = useMemo(() => {
    return udupiPanchayats.filter((gp) => {
      const matchesTaluk = taluk === "All" || gp.taluk === taluk;
      const matchesSearch = gp.name.toLowerCase().includes(search.toLowerCase());
      return matchesTaluk && matchesSearch;
    });
  }, [search, taluk]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Gram Panchayats
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse planning, budget, and progress data for Gram Panchayats across
          Udupi district — sourced from the eGramSwaraj portal.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search panchayat name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-teal-300 sm:max-w-xs"
        />

        <div className="flex gap-2">
          {TALUKS.map((t) => (
            <button
              key={t}
              onClick={() => setTaluk(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                taluk === t
                  ? "bg-teal-800 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-500">
          No panchayats match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((gp) => (
            <Link
              key={gp.lgdCode}
              href={`/my-city/Administrative/panchayats/${gp.lgdCode}`}
              className="group rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100/80 transition-all hover:border-teal-200 hover:shadow-teal-100/60"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-teal-800">
                  {gp.name}
                </h3>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
                  {gp.taluk}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">LGD: {gp.lgdCode}</p>
              <p className="mt-3 text-xs font-medium text-teal-800 opacity-0 transition-opacity group-hover:opacity-100">
                View details →
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}