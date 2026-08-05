import { ResourceAllocation } from "@/features/gram-panchayat/types/panchayat";

export default function BudgetTable({ budget }: { budget: ResourceAllocation[] }) {
  if (budget.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
        No budget allocation data available for this plan year.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-lg shadow-gray-100/80">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-3 font-medium text-gray-600">Scheme Code</th>
            <th className="px-4 py-3 font-medium text-gray-600">General (₹)</th>
            <th className="px-4 py-3 font-medium text-gray-600">SC (₹)</th>
            <th className="px-4 py-3 font-medium text-gray-600">ST (₹)</th>
            <th className="px-4 py-3 font-medium text-gray-600">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((b, i) => (
            <tr
              key={`${b.schemeCode}-${i}`}
              className="border-b border-gray-50 last:border-0 hover:bg-teal-50/40"
            >
              <td className="px-4 py-3 text-gray-700">{b.schemeCode}</td>
              <td className="px-4 py-3 text-gray-700">
                {b.alocationAmountGen?.toLocaleString("en-IN") ?? "0"}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {b.alocationAmountSc?.toLocaleString("en-IN") ?? "0"}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {b.alocationAmountSt?.toLocaleString("en-IN") ?? "0"}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {b.totalBudjAmount?.toLocaleString("en-IN") ?? "0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}