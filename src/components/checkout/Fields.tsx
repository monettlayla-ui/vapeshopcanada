"use client";

import type { ReactNode } from "react";

const base =
  "w-full rounded-[4px] border bg-white px-3 text-[15px] text-slate-800 outline-none transition-colors placeholder:text-slate-500 focus:border-[#c98aa0]";

type Common = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1 text-[13px] text-[#e02b1d]">
      {error}
    </p>
  );
}

/** Text input (the label is shown as the placeholder). Red border when invalid. */
export function TextField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
}: Common & { type?: string; autoComplete?: string }) {
  return (
    <div>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={label}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${base} h-[52px] ${error ? "border-[#e02b1d]" : "border-slate-300"}`}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

/** Select with a small label above the chosen value. Green border once a value is chosen. */
export function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  options,
  autoComplete,
}: Common & { options: string[]; autoComplete?: string }) {
  const border = error ? "border-[#e02b1d]" : value ? "border-[#2f9e44]" : "border-slate-300";
  return (
    <div>
      <div className="relative">
        <label htmlFor={id} className="pointer-events-none absolute top-2 left-3 text-xs text-slate-500">
          {label}
        </label>
        <select
          id={id}
          name={id}
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${base} h-[52px] cursor-pointer appearance-none pt-5 pr-9 ${border}`}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-800"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[22px] text-slate-900 [font-family:var(--font-marcellus),Georgia,serif]">{children}</h2>
  );
}
