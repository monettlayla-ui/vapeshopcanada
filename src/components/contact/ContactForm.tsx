"use client";

import { useState, type FormEvent } from "react";
import { contactContent } from "@/config/site";

const input =
  "w-full rounded-[3px] border border-slate-300 bg-white px-3 text-[15px] text-slate-800 shadow-sm outline-none focus:border-blue-600";
const label = "mb-1 block text-[13px] font-bold text-slate-900";
const sub = "mt-1 block text-[13px] text-slate-900";
const Required = () => <span className="text-red-600"> *</span>;

/**
 * There is no mail server behind this site yet, so Send opens the visitor's
 * email app with the message filled in, addressed to the store email.
 */
export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = `${f.get("first") ?? ""} ${f.get("last") ?? ""}`.trim();
    const body = `Name: ${name}\nEmail: ${f.get("email") ?? ""}\n\n${f.get("message") ?? ""}`;
    const subject = encodeURIComponent(`Message from ${name}`);
    window.location.href = `mailto:${contactContent.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[455px] space-y-6">
      <fieldset>
        <legend className={label}>
          Name
          <Required />
        </legend>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <input name="first" required aria-label="First name" autoComplete="given-name" className={`${input} h-10`} />
            <span className={sub}>First</span>
          </div>
          <div>
            <input name="last" required aria-label="Last name" autoComplete="family-name" className={`${input} h-10`} />
            <span className={sub}>Last</span>
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-email" className={label}>
          Email
          <Required />
        </label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className={`${input} h-10`} />
      </div>

      <div>
        <label htmlFor="contact-message" className={label}>
          Message
          <Required />
        </label>
        <textarea id="contact-message" name="message" required rows={5} className={`${input} py-2`} />
      </div>

      <div>
        <button
          type="submit"
          className="h-11 rounded-sm bg-blue-600 px-8 text-[15px] font-semibold text-white transition hover:bg-blue-700"
        >
          Send
        </button>
        {opened && (
          <p className="mt-3 text-sm text-slate-600">
            Your email app should have opened with your message. Just press send there.
          </p>
        )}
      </div>
    </form>
  );
}
