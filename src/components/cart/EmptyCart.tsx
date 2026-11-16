import { emptyCartContent as c } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

/** Cart page body shown while there is nothing in the cart. */
export function EmptyCart() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-20">
      <h1 className="text-3xl font-semibold text-slate-800 sm:text-[32px]">{c.title}</h1>

      <div
        role="status"
        className="mt-10 flex items-center gap-4 border-t-[3px] border-blue-600 bg-[#f5f5f5] px-6 py-4 text-slate-700"
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 text-blue-600" aria-hidden="true">
          <rect x="2.5" y="3.5" width="19" height="17" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="2.5" y="3.5" width="19" height="4.5" fill="currentColor" />
        </svg>
        <p className="text-[15px]">{c.message}</p>
      </div>

      <ButtonLink
        href={c.cta.href}
        className="mt-8 !rounded-sm !bg-blue-600 !px-7 !py-3 !text-[15px] !text-white shadow-none hover:!bg-blue-700"
      >
        {c.cta.label}
      </ButtonLink>
    </section>
  );
}
