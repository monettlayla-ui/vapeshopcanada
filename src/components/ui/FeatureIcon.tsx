import type { FeatureIconName } from "@/config/site";

const paths: Record<FeatureIconName, React.ReactNode> = {
  truck: (
    <>
      <path d="M2 6h11v9H2z" />
      <path d="M13 9h4l3 3v3h-7z" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
      <path d="M1 9h3M0 12h3" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
      <path d="M2 4h3l2 10h11l2-7H8" />
      <rect x="10" y="8" width="4" height="4" />
    </>
  ),
  arrow: <path d="M19 12H6M11 6l-6 6 6 6" />,
};

/** Round blue badge with a white line icon. */
export function FeatureIcon({ name, dark = false }: { name: FeatureIconName; dark?: boolean }) {
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${dark ? "bg-slate-800" : "bg-blue-600"}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        {paths[name]}
      </svg>
    </span>
  );
}
