"use client";

import { useEffect, useState } from "react";

/** Small blue square at the bottom-right that appears after scrolling and jumps back to the top. */
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-6 z-40 flex h-8 w-8 items-center justify-center rounded-sm bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 sm:h-10 sm:w-10"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
        <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
