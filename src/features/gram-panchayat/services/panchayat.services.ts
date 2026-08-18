import type {
  Activity,
  PhysicalProgress,
  ResourceAllocation,
} from "@/features/gram-panchayat/types/panchayat";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export interface PanchayatDashboard {
  activities: Activity[];
  resources: ResourceAllocation[];
  progress: PhysicalProgress[];
}

async function fetchFromApi<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

export function getPanchayatDashboard(lgdCode: number, planYear: number) {
  return fetchFromApi<PanchayatDashboard>(
    `/panchayats/${lgdCode}/dashboard?plan_year=${planYear}`,
  );
}

export function getActivities(lgdCode: number, planYear: number) {
  return fetchFromApi<Activity[]>(
    `/panchayats/${lgdCode}/activities?plan_year=${planYear}`,
  );
}

export function getResourceEnvelope(lgdCode: number, planYear: number) {
  return fetchFromApi<ResourceAllocation[]>(
    `/panchayats/${lgdCode}/resource-envelope?plan_year=${planYear}`,
  );
}

export function getPhysicalProgress(lgdCode: number, planYear: number) {
  return fetchFromApi<PhysicalProgress[]>(
    `/panchayats/${lgdCode}/physical-progress?plan_year=${planYear}`,
  );
}
