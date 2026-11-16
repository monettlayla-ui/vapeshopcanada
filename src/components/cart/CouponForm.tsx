"use client";

import { useState, type FormEvent } from "react";

/** Coupon box. No discount codes exist yet, so every code is reported as invalid. */
export function CouponForm() {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Sorry, that discount code isn't valid.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          name="code"
          required
          aria-label="Discount code"
          placeholder="Discount code"
          className="h-10 min-w-0 flex-1 border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-sm bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
      {message && (
        <p role="status" className="text-sm text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}
