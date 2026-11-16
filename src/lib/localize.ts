/** Keys whose values are links, file paths or ids and must never be reworded. */
const SKIP_KEYS = new Set(["url", "original_url", "local_path", "slug", "href", "path", "src", "stored_in", "id", "sku"]);

// Matches the word "Australia(n)" in any casing, but not inside web addresses,
// slugs or domain names (those have a letter, "/", "." or "-" right before it).
const COUNTRY = /(?<![\w/.-])(australia)(n?)(s?)(?![\w]*\.(?:com|net|org))/gi;

export function toCanada(text: string): string {
  return text.replace(COUNTRY, (_m, word: string, n: string, s: string) => {
    const upper = word === word.toUpperCase();
    const out = n ? "Canadian" : "Canada";
    return (upper ? out.toUpperCase() : out) + s;
  });
}

/** Walks parsed JSON and swaps Australia for Canada in every piece of text. */
export function localizeJson<T>(value: T, key = ""): T {
  if (typeof value === "string") {
    return (SKIP_KEYS.has(key) ? value : toCanada(value)) as T;
  }
  if (Array.isArray(value)) return value.map((v) => localizeJson(v, key)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localizeJson(v, k)]),
    ) as T;
  }
  return value;
}
