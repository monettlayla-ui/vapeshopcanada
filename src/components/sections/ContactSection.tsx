import { contactContent as c } from "@/config/site";
import { ContactForm } from "@/components/contact/ContactForm";

const iconClass = "h-4 w-4 shrink-0 text-slate-900";

function Pin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

function Mail() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
      <path d="M2 5h20v2.2l-10 6-10-6V5Zm0 4.5 10 6 10-6V19H2V9.5Z" />
    </svg>
  );
}

function Phone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

/** Contact details on a tinted panel (left) beside the message form on white (right). */
export function ContactSection() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="bg-[#eff4f9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-sm md:ml-auto md:mr-[10%]">
          <h2 className="text-center text-3xl font-semibold text-slate-800">{c.title}</h2>
          <p className="mt-6 text-center text-[15px] leading-8 text-slate-700">{c.text}</p>

          <ul className="mt-14 space-y-3 text-[17px] text-slate-800">
            <li className="flex items-center gap-4">
              <Pin />
              <span className="underline">{c.address}</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail />
              <a href={`mailto:${c.email}`} className="underline">
                {c.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Phone />
              <span>{c.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center bg-white px-6 py-16 md:justify-center md:py-24">
        <ContactForm />
      </div>
    </section>
  );
}
