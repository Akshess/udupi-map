"use client";

import { useState, useMemo } from "react";
import { udupiPanchayats } from "@/features/gram-panchayat/data/panchayats";
import PanchayatCard from "@/features/gram-panchayat/components/PanchayatCard";
import PanchayatFilters from "@/features/gram-panchayat/components/PanchayatFilters";
import { TALUKS_WITH_ALL, TalukFilter } from "@/features/gram-panchayat/data/talukas";

export default function PanchayatsPage() {
  const [search, setSearch] = useState("");
  const [taluk, setTaluk] = useState<TalukFilter>("All");

  const filtered = useMemo(() => {
    return udupiPanchayats.filter((gp) => {
      const matchesTaluk = taluk === "All" || gp.taluk === taluk;
      const matchesSearch = gp.name.toLowerCase().includes(search.toLowerCase());
      return matchesTaluk && matchesSearch;
    });
  }, [search, taluk]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Gram Panchayats
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse planning, budget, and progress data for Gram Panchayats across
          Udupi district — sourced from the eGramSwaraj portal.
        </p>
      </div>

      <PanchayatFilters
        search={search}
        onSearchChange={setSearch}
        taluk={taluk}
        onTalukChange={setTaluk}
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-500">
          No panchayats match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((gp) => (
            <PanchayatCard key={gp.lgdCode} panchayat={gp} />
          ))}
        </div>
      )}
    </main>
  );
}