import { navItems } from "@/config/site";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

type HeaderProps = {
  /**
   * overlay: transparent over a dark hero (white logo + links).
   * overlay-dark: transparent over a light hero (dark logo + links).
   * solid: white bar for inner pages.
   */
  variant?: "overlay" | "overlay-dark" | "solid";
};

export function Header({ variant = "overlay" }: HeaderProps) {
  const solid = variant === "solid";
  const onDarkBackground = variant === "overlay";
  return (
    <header
      className={
        solid
          ? "relative z-40 border-b border-slate-200 bg-white"
          : "absolute inset-x-0 top-0 z-40"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo onDark={onDarkBackground} />
        <Nav items={navItems} tone={onDarkBackground ? "light" : "dark"} />
      </div>
    </header>
  );
}
