import Link from "next/link";
import React from "react";

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
  { label: "Raise Issue", href: "/raise-issue" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC<NavbarProps> = ({ items = defaultLinks }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">Udupi Map</div>
        <ul className="flex gap-6 text-sm font-medium text-slate-700">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-slate-900">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;