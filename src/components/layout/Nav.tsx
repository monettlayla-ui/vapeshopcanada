"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavItem } from "@/config/site";

type NavProps = {
  items: NavItem[];
  /** light = white links (dark background), dark = dark links (light background) */
  tone?: "light" | "dark";
};

export function Nav({ items, tone = "light" }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";

  const linkClass = (href: string) => {
    const active = pathname === href;
    if (dark) {
      return `block px-3 py-2 text-[15px] transition-colors ${
        active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
      }`;
    }
    return `block px-3 py-2 text-[15px] transition-colors ${
      active ? "text-white" : "text-white/60 hover:text-white"
    }`;
  };

  const bar = dark ? "bg-slate-900" : "bg-white";

  return (
    <nav aria-label="Main">
      {/* Desktop */}
      <ul className="hidden items-center gap-5 md:flex">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} prefetch className={linkClass(item.href)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span className={`h-0.5 w-6 ${bar}`} />
        <span className={`h-0.5 w-6 ${bar}`} />
        <span className={`h-0.5 w-6 ${bar}`} />
      </button>

      {open && (
        <ul
          className={`absolute inset-x-0 top-full px-6 py-3 md:hidden ${
            dark ? "border-b border-slate-200 bg-white" : "bg-black/90"
          }`}
        >
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch
                className={linkClass(item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
