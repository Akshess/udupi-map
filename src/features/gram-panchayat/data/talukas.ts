export const TALUKS_WITH_ALL = ["All", "Udupi", "Karkala", "Kundapura", "Bainduru", "Brahmavara", "Hebri", "Kapu"] as const;
export type TalukFilter = (typeof TALUKS_WITH_ALL)[number];
// → type TalukFilter = "All" | "Udupi" | "Karkala" | "Kundapura" | "Bainduru" | "Brahmavara" | "Hebri" | "Kapu"