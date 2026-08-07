"use client";

import dynamic from "next/dynamic";

const PanchayatMap = dynamic(
  () => import("./PanchayatMap"),
  {
    ssr: false,
    loading: () => (
      <div className="mb-8 h-[500px] w-full animate-pulse rounded-xl bg-gray-100" />
    ),
  }
);

export default function ClientMap() {
  return <PanchayatMap />;
}
