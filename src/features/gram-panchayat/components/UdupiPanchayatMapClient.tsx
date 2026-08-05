import Link from "next/link";
import { notFound } from "next/navigation";
import { udupiPanchayats } from "@/features/gram-panchayat/data/panchayats";
import {
  getActivities,
  getResourceEnvelope,
  getPhysicalProgress,
} from "@/features/gram-panchayat/services/panchayat.services";
import { Activity, ResourceAllocation, PhysicalProgress } from "@/features/gram-panchayat/types/panchayat";
import ActivitiesTable from "@/features/gram-panchayat/components/ActivitiesTable";
import BudgetTable from "@/features/gram-panchayat/components/BudgetTable";
import ProgressTable from "@/features/gram-panchayat/components/ProgressTable";

const CURRENT_PLAN_YEAR = 2023; // FY 2023-24

export default async function PanchayatDetailPage({
  params,
}: {
  params: Promise<{ lgdCode: string }>;
}) {
  const { lgdCode: lgdCodeStr } = await params;
  const lgdCode = Number(lgdCodeStr);

  if (isNaN(lgdCode)) notFound();

  const panchayat = udupiPanchayats.find((gp) => gp.lgdCode === lgdCode);

  if (!panchayat) notFound();

  const [activitiesResult, budgetResult, progressResult] = await Promise.allSettled([
    getActivities(lgdCode, CURRENT_PLAN_YEAR),
    getResourceEnvelope(lgdCode, CURRENT_PLAN_YEAR),
    getPhysicalProgress(lgdCode, CURRENT_PLAN_YEAR),
  ]);

  const activities: Activity[] =
    activitiesResult.status === "fulfilled" ? (activitiesResult.value as Activity[]) : [];
  const budget: ResourceAllocation[] =
    budgetResult.status === "fulfilled" ? (budgetResult.value as ResourceAllocation[]) : [];
  const progress: PhysicalProgress[] =
    progressResult.status === "fulfilled" ? (progressResult.value as PhysicalProgress[]) : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Link
        href="/my-city/Administrative/gram-panchayats"
        className="mb-6 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-teal-800"
      >
        ← Back to all panchayats
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          {panchayat.name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {panchayat.taluk} taluk · LGD Code {lgdCode} · FY {CURRENT_PLAN_YEAR}-
          {(CURRENT_PLAN_YEAR + 1).toString().slice(-2)}
        </p>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Approved Activities" value={activities.length} />
        <SummaryCard label="Total Budget Lines" value={budget.length} />
        <SummaryCard label="Assets Reported" value={progress.length} />
      </div>
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Approved Activities</h2>
        <ActivitiesTable activities={activities} />
      </section>
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Resource Envelope (Budget Allocation)
        </h2>
        <BudgetTable budget={budget} />
      </section>
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Physical Progress</h2>
        <ProgressTable progress={progress} />
      </section>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-100/80">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-teal-800">{value}</p>
    </div>
  );
}
