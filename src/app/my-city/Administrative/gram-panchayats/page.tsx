"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { udupiPanchayats } from "@/features/gram-panchayat/data/panchayats";

// Must be dynamically imported with ssr: false — Leaflet breaks on the server
const PanchayatMap = dynamic(
  () => import("@/features/gram-panchayat/components/PanchayatMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mb-8 h-[500px] w-full animate-pulse rounded-xl bg-gray-100" />
    ),
  },
);

export default function PanchayatsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const matches = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    return udupiPanchayats
      .filter((gp) => gp.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [search]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Gram Panchayats
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Select a panchayat on the map, or search by name to view its planning,
          budget, and progress data.
        </p>
      </div>

      <section className="mb-8">
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="panchayat-search"
        >
          Search a Gram Panchayat
        </label>
        <input
          id="panchayat-search"
          type="search"
          placeholder="Start typing a panchayat name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:max-w-lg"
        />

        {search.trim() && (
          <div className="mt-2 max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {matches.length > 0 ? (
              matches.map((gp) => (
                <button
                  className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left text-sm last:border-b-0 hover:bg-teal-50"
                  key={gp.lgdCode}
                  onClick={() =>
                    router.push(
                      `/my-city/Administrative/gram-panchayats/${gp.lgdCode}`,
                    )
                  }
                  type="button"
                >
                  <span className="font-medium text-gray-900">{gp.name}</span>
                  <span className="text-xs text-gray-500">{gp.taluk}</span>
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500">
                No panchayats match “{search.trim()}”.
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Map View</h2>
        <PanchayatMap />
      </section>
    </main>
  );
}
