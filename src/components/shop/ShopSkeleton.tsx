/** Placeholder shown for an instant while the shop's product list loads. Matches the real layout. */
export function ShopSkeleton() {
  const bar = "animate-pulse rounded bg-slate-200";

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[360px_1fr] lg:gap-0" aria-busy="true">
      <aside className="lg:border-r lg:border-slate-300 lg:pr-10">
        <div className={`${bar} h-4 w-16`} />
        <div className="mt-3 flex gap-3">
          <div className={`${bar} h-11 flex-1`} />
          <div className={`${bar} h-11 w-24`} />
        </div>
        <div className="mt-12 space-y-3 pl-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`${bar} h-4`} style={{ width: `${55 + ((i * 13) % 40)}%` }} />
          ))}
        </div>
      </aside>

      <section className="lg:pl-12">
        <div className={`${bar} h-4 w-32`} />
        <div className={`${bar} mt-6 h-10 w-40`} />
        <div className={`${bar} mt-10 h-5 w-56`} />
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>
              <div className={`${bar} aspect-square w-full`} />
              <div className={`${bar} mt-5 h-3 w-24`} />
              <div className={`${bar} mt-3 h-4 w-full`} />
              <div className={`${bar} mt-3 h-4 w-20`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
