"use client";

import dynamic from "next/dynamic";

// Generic map shell — wraps whichever full map client is needed.
// Import the specific map (UdupiMapClient, PanchayatMap, etc.) directly
// in page components; this file exists as a re-export convenience.
const UdupiMapClient = dynamic(
  () => import("@/features/maps/components/UdupiMapClient"),
  { ssr: false }
);

export default function Map() {
  return <UdupiMapClient />;
}
