import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/** `onDark` = logo sits on a dark background (white lettering). */
export function Logo({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
      <Image
        src={onDark ? siteConfig.logo.light : siteConfig.logo.dark}
        alt={siteConfig.name}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        className="h-20 w-auto"
        priority
      />
    </Link>
  );
}
