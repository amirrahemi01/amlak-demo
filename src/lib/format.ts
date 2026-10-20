import type { Lang } from "@/i18n/config";

const FA = "۰۱۲۳۴۵۶۷۸۹";
/** Persian digits for fa, unchanged for en */
export const digits = (lang: Lang, v: number | string) => (lang === "fa" ? String(v).replace(/\d/g, (d) => FA[+d]).replace(".", "٫") : String(v));
export const num = (lang: Lang, n: number) => (lang === "fa" ? digits(lang, n.toLocaleString("en-US").replace(/,/g, "٬")) : n.toLocaleString("en-US"));

/** Demo exchange rate for the English (international) version */
export const TOMAN_PER_USD = 100_000;

/** Toman -> "$680,000" / "$1.85M"; short=true gives "$50K" for filter labels */
export function usd(toman: number, short = false) {
  const v = toman / TOMAN_PER_USD;
  if (v >= 1e6) return `$${Math.round((v / 1e6) * 100) / 100}M`;
  if (short && v >= 1e3) return `$${Math.round(v / 1e3)}K`;
  return `$${Math.round(v).toLocaleString("en-US")}`;
}

/** Price: Persian shows toman ("۱۲٫۵ میلیارد تومان"), English shows US dollars */
export function price(lang: Lang, toman: number) {
  if (lang === "en") return usd(toman);
  if (toman >= 1e9) {
    const v = Math.round((toman / 1e9) * 100) / 100;
    return `${digits(lang, v)} میلیارد تومان`;
  }
  const v = Math.round(toman / 1e6);
  return `${num(lang, v)} میلیون تومان`;
}
