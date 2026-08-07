"use client";

import { useState } from "react";

interface SideBarProps {
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function SideBar({
  title,
  children,
  defaultOpen = true,
}: SideBarProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <aside
      className={`flex flex-col rounded-2xl border bg-white shadow transition-all ${
        open ? "w-72 p-6" : "w-14 p-3"
      }`}
    >
      <div className="flex items-center justify-between">
        {open && title && (
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="ml-auto rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-teal-800"
        >
          {open ? "◀" : "▶"}
        </button>
      </div>

      {open && <div className="mt-4 flex-1 overflow-y-auto">{children}</div>}
    </aside>
  );
}
