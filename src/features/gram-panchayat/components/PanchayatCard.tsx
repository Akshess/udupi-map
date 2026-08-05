import Link from "next/link";
import { Panchayat } from "@/features/gram-panchayat/types/panchayat";

export default function PanchayatCard({ panchayat }: { panchayat: Panchayat }) {
  return (
    <Link
      href={`/my-city/Administrative/gram-panchayats/${panchayat.lgdCode}`}
      className="group rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100/80 transition-all hover:border-teal-200 hover:shadow-teal-100/60"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-teal-800">
          {panchayat.name}
        </h3>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
          {panchayat.taluk}
        </span>
      </div>
      <p className="mt-2 text-xs text-gray-400">LGD: {panchayat.lgdCode}</p>
      <p className="mt-3 text-xs font-medium text-teal-800 opacity-0 transition-opacity group-hover:opacity-100">
        View details →
      </p>
    </Link>
  );
}