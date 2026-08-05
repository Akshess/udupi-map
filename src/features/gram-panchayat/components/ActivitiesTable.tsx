import { Activity } from "@/features/gram-panchayat/types/panchayat";

export default function ActivitiesTable({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
        No activity data available for this plan year.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg shadow-gray-100/80">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-3 font-medium text-gray-600">Activity Code</th>
            <th className="px-4 py-3 font-medium text-gray-600">Type</th>
            <th className="px-4 py-3 font-medium text-gray-600">Status</th>
            <th className="px-4 py-3 font-medium text-gray-600">Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr
              key={a.activityCd}
              className="border-b border-gray-50 last:border-0 hover:bg-teal-50/40"
            >
              <td className="px-4 py-3 text-gray-700">{a.activityCd}</td>
              <td className="px-4 py-3 text-gray-700">{a.activityType ?? "—"}</td>
              <td className="px-4 py-3 text-gray-700">{a.activityStts ?? "—"}</td>
              <td className="px-4 py-3 text-gray-700">
                {a.totalCost?.toLocaleString("en-IN") ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}