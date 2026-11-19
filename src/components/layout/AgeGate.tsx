"use client";

import { useEffect, useRef, useState } from "react";

/** Minimum age to enter the site. */
const MIN_AGE = 19;
const STORAGE_KEY = "vape-shop-canada-age-ok";
/** Visitors who say they are under age are sent here. */
const EXIT_URL = "https://www.google.com";

/**
 * Full-screen age check shown once per browser. The page content is still in the HTML
 * (so search engines can read it); this only covers it until the visitor confirms.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage blocked: ask every visit */
    }
    // The saved answer lives in the browser, so it can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(!ok);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    yesRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  // Under age: take them off the site and keep the answer out of the history.
  const leave = () => window.location.replace(EXIT_URL);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-7 text-center shadow-2xl sm:p-9">
        <p className="text-sm font-semibold tracking-wide text-[#e0457b] uppercase">Vape Shop Canada</p>
        <h2 id="age-gate-title" className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Are you {MIN_AGE} years old or older?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          This website sells nicotine products. You must be at least {MIN_AGE} years old to enter.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            ref={yesRef}
            type="button"
            onClick={confirm}
            className="h-12 flex-1 rounded-[4px] bg-[#e0457b] text-base font-semibold text-white shadow-md shadow-[#e0457b]/30 transition hover:bg-[#cc3a6d]"
          >
            Yes, I am {MIN_AGE}+
          </button>
          <button
            type="button"
            onClick={leave}
            className="h-12 flex-1 rounded-[4px] border border-slate-300 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            No, I am not
          </button>
        </div>
      </div>
    </div>
  );
}
