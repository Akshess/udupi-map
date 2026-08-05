import { TALUKS_WITH_ALL } from "@/features/gram-panchayat/data/talukas";

// Static reference info for a Gram Panchayat (from LGD Directory)
export interface Panchayat {
  name: string;
  taluk: typeof TALUKS_WITH_ALL[number];
  lgdCode: number;
}

// Shape returned by your FastAPI backend's /activities endpoint
export interface Activity {
  activityCd: number;
  activityType?: string;
  activityName?: string;
  totalCost?: number;
  schemeCode?: number;
  activityStts?: string;
}

// Shape returned by /resource-envelope
export interface ResourceAllocation {
  schemeCode: number;
  schemeComponentCode: number;
  alocationAmountGen: number | null;
  alocationAmountSc: number | null;
  alocationAmountSt: number | null;
  totalBudjAmount: number | null;
}

// Shape returned by /physical-progress
export interface PhysicalProgress {
  activityCd: number;
  astLocType: string;
  astNm: string;
  completed: string | null;
}