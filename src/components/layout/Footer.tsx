import Link from "next/link";
import { footerContent as c, footerNavItems } from "@/config/site";

const linkClass = "text-blue-600 hover:text-blue-800 hover:underline";

export function Footer() {
  return (
    <footer>
      <div className="border-t border-slate-300 bg-[#f9f9f9]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
          {/* Site links */}
          <ul className="space-y-1">
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Policies */}
          <ul className="space-y-1 md:text-center">
            {c.legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="text-slate-800 md:text-center">
            <p>{c.contactLabel}</p>
            <p className="mt-6">
              <a href={`mailto:${c.email}`} className="underline underline-offset-4 hover:text-slate-950">
                {c.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300 bg-white px-4 py-5 text-center text-slate-700">
        {c.copyright}
      </div>

      <div className="bg-[#f3f3f3] px-5 pt-8 pb-14 text-center text-[15px] leading-relaxed text-slate-500 sm:text-lg sm:leading-8">
        <p className="mx-auto max-w-3xl">
          © <Link href="/" className="underline decoration-slate-400 underline-offset-4">{c.notice.brand}</Link>
          {"  -  "}
          <strong className="font-bold">{c.notice.servingLead}</strong> {c.notice.servingRest}
        </p>
      </div>
    </footer>
  );
}
