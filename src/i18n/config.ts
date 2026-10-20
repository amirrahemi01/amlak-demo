export const locales = ["fa", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "fa";
export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);
export const dirOf = (l: Lang) => (l === "fa" ? "rtl" : "ltr");
/** Bilingual text */
export type L = Record<Lang, string>;
