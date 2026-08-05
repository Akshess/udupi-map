import { PhysicalProgress } from "@/features/gram-panchayat/types/panchayat";

export default function ProgressTable({ progress }: { progress: PhysicalProgress[] }) {
  if (progress.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
        No physical progress data available for this plan year.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg shadow-gray-100/80">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-3 font-medium text-gray-600">Activity Code</th>
            <th className="px-4 py-3 font-medium text-gray-600">Asset Type</th>
            <th className="px-4 py-3 font-medium text-gray-600">Location Type</th>
            <th className="px-4 py-3 font-medium text-gray-600">Completed</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((p, i) => (
            <tr
              key={`${p.activityCd}-${i}`}
              className="border-b border-gray-50 last:border-0 hover:bg-teal-50/40"
            >
              <td className="px-4 py-3 text-gray-700">{p.activityCd}</td>
              <td className="px-4 py-3 text-gray-700">{p.astNm ?? "—"}</td>
              <td className="px-4 py-3 text-gray-700">{p.astLocType ?? "—"}</td>
              <td className="px-4 py-3 text-gray-700">{p.completed ?? "In progress"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}