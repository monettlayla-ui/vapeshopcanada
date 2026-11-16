"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the site footer on the checkout page, which has its own slim layout. */
export function FooterGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/checkout")) return null;
  return <>{children}</>;
}
