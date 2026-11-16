type Paragraph = string | string[]; // an array = lines that sit together with no gap

type TextSectionProps = {
  title: string;
  paragraphs: Paragraph[];
  compact?: boolean;
  tight?: boolean;
};

/** Centered heading with paragraphs of plain text. */
export function TextSection({ title, paragraphs, compact = false, tight = false }: TextSectionProps) {
  return (
    <section className={`bg-white px-4 ${compact ? "pt-4 pb-16 sm:pt-6 sm:pb-24" : "py-12 sm:py-16"}`}>
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-[2rem] leading-tight font-medium text-slate-800 sm:text-4xl">{title}</h2>

        <div className={`mt-6 ${tight ? "" : "space-y-5"} text-base leading-relaxed text-slate-700`}>
          {paragraphs.map((p, i) =>
            Array.isArray(p) ? (
              <div key={i}>
                {p.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ) : (
              <p key={i}>{p}</p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
