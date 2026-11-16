import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className = "" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch
      className={`inline-flex items-center justify-center rounded-sm bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-md transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      {children}
    </Link>
  );
}
