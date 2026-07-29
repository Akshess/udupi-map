import Link from "next/link";
import Image from "next/image";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface NavbarItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavbarItem[];
}

const defaultLinks: NavbarItem[] = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "My City", href: "/my-city" },
  { label: "Transportation", href: "/transportation" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC<NavbarProps> = ({ items = defaultLinks }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/title_logo.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>

        {/* Navigation */}
        <ul className="ml-auto flex gap-8 text-lg font-medium text-slate-700">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="ml-8 flex items-center gap-5">

          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🪙 0
          </div>

          <button>
            <UserCircleIcon className="h-10 w-10 text-slate-700 hover:text-blue-600" />
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;