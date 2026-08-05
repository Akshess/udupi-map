import { TALUKS_WITH_ALL, TalukFilter } from "@/features/gram-panchayat/data/talukas";

interface PanchayatFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  taluk: TalukFilter;
  onTalukChange: (value: TalukFilter) => void;
}

export default function PanchayatFilters({
  search,
  onSearchChange,
  taluk,
  onTalukChange,
}: PanchayatFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search panchayat name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-teal-300 sm:max-w-xs"
      />

      <div className="flex flex-wrap gap-2">
        {TALUKS_WITH_ALL.map((t) => (
          <button
            key={t}
            onClick={() => onTalukChange(t)}
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
  );
}