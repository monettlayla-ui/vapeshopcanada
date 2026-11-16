import Link from "next/link";
import { buildShopUrl, type ShopParams } from "@/lib/shop-url";

type PaginationProps = { current: number; total: number; params: ShopParams };

const END_SIZE = 3; // always show this many pages at each end
const MID_SIZE = 3; // and this many either side of the current page

function pageItems(current: number, total: number): (number | "dots")[] {
  const items: (number | "dots")[] = [];
  let lastWasDots = false;
  for (let n = 1; n <= total; n++) {
    const show = n <= END_SIZE || (n >= current - MID_SIZE && n <= current + MID_SIZE) || n > total - END_SIZE;
    if (show) {
      items.push(n);
      lastWasDots = false;
    } else if (!lastWasDots) {
      items.push("dots");
      lastWasDots = true;
    }
  }
  return items;
}

const box = "flex h-[42px] min-w-[42px] items-center justify-center border border-blue-600 px-3 text-[15px]";

export function Pagination({ current, total, params }: PaginationProps) {
  if (total <= 1) return null;
  const href = (page: number) => buildShopUrl({ ...params, page });

  return (
    <nav aria-label="Pagination" className="mt-14">
      <ul className="flex flex-wrap items-center gap-2">
        {current > 1 && (
          <li>
            <Link href={href(current - 1)} className={`${box} text-blue-600 hover:bg-blue-50`} aria-label="Previous page">
              ←
            </Link>
          </li>
        )}
        {pageItems(current, total).map((item, i) =>
          item === "dots" ? (
            <li key={`dots-${i}`} className={`${box} text-blue-600`} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              {item === current ? (
                <span aria-current="page" className={`${box} bg-blue-600 text-white`}>
                  {item}
                </span>
              ) : (
                <Link href={href(item)} className={`${box} text-blue-600 hover:bg-blue-50`}>
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
        {current < total && (
          <li>
            <Link href={href(current + 1)} className={`${box} text-blue-600 hover:bg-blue-50`} aria-label="Next page">
              →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
