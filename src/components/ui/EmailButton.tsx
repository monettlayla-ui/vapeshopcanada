"use client";

import { useState } from "react";
import { contactContent } from "@/config/site";

/**
 * Round email button fixed to the bottom-right. Opens a small message bubble;
 * the button inside it opens the visitor's email app addressed to the store.
 */
export function EmailButton() {
  const [open, setOpen] = useState(false);
  const mailto = `mailto:${contactContent.email}?subject=${encodeURIComponent("Question from the website")}`;

  return (
    <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Email us"
          className="w-[270px] rounded-lg bg-white p-4 text-left shadow-2xl ring-1 ring-black/10"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[15px] font-semibold text-slate-900">Have a question?</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mt-1 -mr-1 flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Send us an email about an order, a product or anything else and we will get back to you.
          </p>
          <a
            href={mailto}
            className="mt-3 flex h-10 items-center justify-center rounded-[4px] bg-[#e0457b] px-3 text-sm font-semibold text-white transition hover:bg-[#cc3a6d]"
          >
            Email us
          </a>
          <p className="mt-2 text-center text-xs break-all text-slate-500">{contactContent.email}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Email us"
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e0457b] text-white shadow-lg shadow-[#e0457b]/40 transition hover:bg-[#cc3a6d]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 7 8.5 6.5L20.5 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
