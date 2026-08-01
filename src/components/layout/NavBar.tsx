"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavbarItem {
  label: string;
  href?: string;
  children?: NavbarItem[];
}

interface NavbarProps {
  items?: NavbarItem[];
}

const defaultLinks: NavbarItem[] = [
  { label: "Home", href: "/" },
  { label: "Story", children: [
          {
            label: "Our Story",
            href: "/stories/our-story",
          },
          {
            label: "Your Story",
            href: "/stories/your-story",
          },
        ]
      },
  { label: "Events", href: "/events" },
  {
    label: "My City",
    children: [
      {
        label: "Administrative",
        children: [
          { label: "Talukas", href: "/my-city/Administrative/talukas" },
          { label: "Wards", href: "/my-city/Administrative/wards" },
          { label: "Panchayats", href: "/my-city/Administrative/panchayats" },
          { label: "Municipalities", href: "/my-city/Administrative/municipalities" },
        ],
      },
    ],
  },
  { label: "Transportation", href: "/transportation" },
  { label: "Raise Issue", href: "/raise-issue" },
  { label: "Contact", href: "/contact" },
];

// ── Recursive mobile accordion item ──────────────────────────────────────────
function MobileNavItem({ item, depth = 0, onClose }: { item: NavbarItem; depth?: number; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className="block py-2.5 text-sm text-white-700 hover:text-teal-800 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 16}px` }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-2.5 text-sm text-gray-700 hover:text-teal-800 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 16}px`, paddingRight: "16px" }}
        aria-expanded={open}
      >
        {item.label}
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-l border-gray-100 ml-4">
          {item.children.map((child) => (
            <MobileNavItem key={child.label} item={child} depth={depth + 1} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Desktop dropdown (recursive, supports 2 levels) ──────────────────────────
function DesktopDropdown({ item }: { item: NavbarItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <li ref={ref} className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-full items-center gap-1 text-sm font-medium text-gray-700 hover:text-teal-800 transition-colors"
      >
        {item.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg shadow-gray-100/80"
        >
          {item.children!.map((child) =>
            child.children ? (
              <DesktopSubDropdown key={child.label} item={child} onClose={() => setOpen(false)} />
            ) : (
              <li key={child.label} role="none">
                <Link
                  href={child.href!}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                >
                  {child.label}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
}

function DesktopSubDropdown({ item, onClose }: { item: NavbarItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li ref={ref} role="none" className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <svg className="h-3.5 w-3.5 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute left-full top-0 z-50 min-w-[200px] rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg shadow-gray-100/80"
        >
          {item.children!.map((subItem) => (
            <li key={subItem.label} role="none">
              <Link
                href={subItem.href!}
                role="menuitem"
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar: React.FC<NavbarProps> = ({ items = defaultLinks }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/title_logo.png"
            alt="Go Udupi"
            width={120}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="ml-10 hidden h-full items-center gap-6 md:flex">
          {items.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <li key={item.label} className="h-full flex items-center">
                <Link
                  href={item.href!}
                  className="text-sm font-medium text-gray-700 hover:text-teal-800 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-3">
          {/* Points badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 sm:flex">
            <span className="text-sm">🪙</span>
            <span className="text-xs font-semibold text-amber-700">0</span>
          </div>

          {/* Profile */}
          <button
            type="button"
            aria-label="Open profile"
            className="rounded-full p-0.5 text-gray-500 hover:text-teal-800 transition-colors"
          >
            <UserCircleIcon className="h-8 w-8" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          >
            {mobileOpen
              ? <XMarkIcon className="h-5 w-5" />
              : <Bars3Icon className="h-5 w-5" />
            }
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl divide-y divide-gray-100 px-4 pb-4">
            {items.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
