"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "vape-shop-canada-age-ok";
/** Visitors who are under age are sent here. */
const EXIT_URL = "https://www.google.com";

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

/** Minimum age by province. Everywhere not listed here is 19. */
const MIN_AGE_BY_PROVINCE: Record<string, number> = { Alberta: 18, Manitoba: 18, Quebec: 18 };
const minAge = (province: string) => MIN_AGE_BY_PROVINCE[province] ?? 19;

const TEXT = {
  welcome: "Welcome to",
  selectProvince: "Select your province to validate your age.",
  onlyAdults: (n: number) => `We only sell to adults age ${n} years or older in your province.`,
  pickDate: (n: number) => `Please select your birthdate to confirm you are at least ${n} years of age.`,
  dob: "DATE OF BIRTH",
  yes: (n: number) => `Yes, I am ${n} years or older`,
  verify: "Verify",
  invalid: "Please enter a valid date of birth.",
  notice: "This website hosts promotional and sales material for adults only (18/19+), not intended for minors.",
  id: "Government ID verification is required to complete all deliveries for online purchases.",
};

/** Age in whole years for a month/day/year birthdate, or null when the date is not real. */
function ageFrom(month: number, day: number, year: number): number | null {
  const today = new Date();
  if (!Number.isInteger(month) || !Number.isInteger(day) || !Number.isInteger(year)) return null;
  if (year < 1900 || month < 1 || month > 12 || day < 1) return null;
  const born = new Date(year, month - 1, day);
  if (born.getFullYear() !== year || born.getMonth() !== month - 1 || born.getDate() !== day) return null;
  if (born > today) return null;
  let age = today.getFullYear() - year;
  if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) age -= 1;
  return age;
}

/**
 * Full-page age check shown once per browser. The page content is still in the HTML
 * (so search engines can read it); this only covers it until the visitor is verified.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [province, setProvince] = useState("Ontario");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(false);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

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
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const t = TEXT;
  const needed = minAge(province);
  const digits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);

  const verify = () => {
    const age = ageFrom(Number(month), Number(day), Number(year));
    if (age === null || year.length !== 4) {
      setError(true);
      return;
    }
    if (age < needed) {
      // Under age: take them off the site.
      window.location.replace(EXIT_URL);
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const field =
    "h-12 w-full rounded-[4px] border border-slate-300 bg-white px-2 text-center text-base text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#e0457b] focus:ring-2 focus:ring-[#e0457b]/30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-white"
    >
      <header className="flex h-[88px] items-center justify-center bg-black">
        <Image src="/images/logo-white.png" alt="Vape Shop Canada" width={602} height={432} unoptimized className="h-[76px] w-auto" />
      </header>

      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-10 pb-12 text-center">
        <h1 id="age-gate-title" className="text-[2rem] leading-tight font-medium text-slate-900 sm:text-4xl">
          {t.welcome} <strong className="font-bold">Vape Shop Canada</strong>
        </h1>

        <p className="mt-9 text-[15px] text-slate-800">{t.selectProvince}</p>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          aria-label={t.selectProvince}
          className="mt-4 h-11 w-full max-w-[300px] rounded-[4px] border border-slate-300 bg-white px-3 text-[15px] text-slate-700 outline-none focus:border-[#e0457b] focus:ring-2 focus:ring-[#e0457b]/30"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <p className="mt-8 text-[15px] font-bold text-slate-900 underline">{t.onlyAdults(needed)}</p>
        <p className="mt-4 text-[15px] text-slate-800">{t.pickDate(needed)}</p>

        <div className="mt-9 w-full bg-black px-6 py-6 text-white">
          <p className="text-sm font-bold tracking-wide">{t.dob}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <input
              inputMode="numeric"
              autoComplete="bday-month"
              placeholder="MM"
              aria-label="Month"
              value={month}
              onChange={(e) => {
                const v = digits(e.target.value, 2);
                setMonth(v);
                setError(false);
                if (v.length === 2) dayRef.current?.focus();
              }}
              className={field}
            />
            <input
              ref={dayRef}
              inputMode="numeric"
              autoComplete="bday-day"
              placeholder="DD"
              aria-label="Day"
              value={day}
              onChange={(e) => {
                const v = digits(e.target.value, 2);
                setDay(v);
                setError(false);
                if (v.length === 2) yearRef.current?.focus();
              }}
              className={field}
            />
            <input
              ref={yearRef}
              inputMode="numeric"
              autoComplete="bday-year"
              placeholder="YYYY"
              aria-label="Year"
              value={year}
              onChange={(e) => {
                setYear(digits(e.target.value, 4));
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              className={field}
            />
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-[#ff8fb0]">
              {t.invalid}
            </p>
          )}

          <p className="mt-6 text-[15px]">{t.yes(needed)}</p>
          <button
            type="button"
            onClick={verify}
            className="mt-4 h-11 w-full rounded-[4px] bg-[#e0457b] text-base font-semibold text-white transition hover:bg-[#cc3a6d]"
          >
            {t.verify}
          </button>
        </div>

        <p className="mt-6 max-w-[330px] text-[15px] font-semibold text-slate-800">{t.notice}</p>
        <p className="mt-4 max-w-[330px] text-[15px] font-semibold text-slate-800">{t.id}</p>
      </div>
    </div>
  );
}
