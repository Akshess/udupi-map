const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchFromApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 3600 }, // cache 1hr - server component fetch
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export function getActivities(lgdCode: number, planYear: number) {
  return fetchFromApi(`/panchayats/${lgdCode}/activities?plan_year=${planYear}`);
}

export function getResourceEnvelope(lgdCode: number, planYear: number) {
  return fetchFromApi(`/panchayats/${lgdCode}/resource-envelope?plan_year=${planYear}`);
}

export function getPhysicalProgress(lgdCode: number, planYear: number) {
  return fetchFromApi(`/panchayats/${lgdCode}/physical-progress?plan_year=${planYear}`);
}