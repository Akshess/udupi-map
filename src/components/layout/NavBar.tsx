import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

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
  { label: "Story", href: "/story" },
  {
    label: "My City",
    children: [
      {
        label: "Administrative",
        children: [
          {
            label: "Talukas",
            href: "/my-city/Administrative/talukas",
          },
          {
            label: "Wards",
            href: "/my-city/Administrative/wards",
          },
          {
            label: "Panchayats",
            href: "/my-city/Administrative/panchayats",
          },
          {
            label: "Municipalities",
            href: "/my-city/Administrative/municipalities",
          },
        ],
      },
    ],
  },
  { label: "Transportation", href: "/transportation" },
  { label: "Raise Issue", href: "/raise-issue" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC<NavbarProps> = ({ items = defaultLinks }) => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/title_logo.png"
            alt="Go Udupi"
            width={150}
            height={150}
            priority
          />
        </Link>

        {/* Navigation */}
        <ul className="ml-auto flex h-full items-center gap-8 text-lg font-medium text-slate-700">
          {items.map((item) => (
            <li key={item.label} className="relative h-full">
              {item.children ? (
                <div className="group flex h-full items-center">
                  <button
                    type="button"
                    className="flex h-full items-center gap-1 transition-colors hover:text-blue-600"
                  >
                    {item.label}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {/* First Level Dropdown */}
                  <div className="absolute left-0 top-full z-50 invisible min-w-[240px] rounded-lg border border-gray-200 bg-white shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) =>
                      child.children ? (
                        <div
                          key={child.label}
                          className="group/sub relative"
                        >
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-blue-50 hover:text-blue-600"
                          >
                            {child.label}
                            <ChevronRightIcon className="h-4 w-4" />
                          </button>

                          {/* Second Level */}
                          <div className="absolute left-full top-0 invisible min-w-[220px] rounded-lg border border-gray-200 bg-white shadow-lg opacity-0 transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">
                            {child.children.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href!}
                                className="block px-5 py-3 hover:bg-blue-50 hover:text-blue-600"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href!}
                          className="block px-5 py-3 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className="flex h-full items-center transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="ml-8 flex items-center gap-5">
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🪙 0
          </div>

          <button type="button">
            <UserCircleIcon className="h-10 w-10 text-slate-700 hover:text-blue-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;