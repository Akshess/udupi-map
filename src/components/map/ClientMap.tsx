"use client";

import dynamic from "next/dynamic";

const UdupiMap = dynamic(
  () => import("./UdupiMapClient"),
  {
    ssr: false,
  }
);

export default function ClientMap() {
  return <UdupiMap />;
}