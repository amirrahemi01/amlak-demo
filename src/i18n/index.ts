import type { L, Lang } from "./config";
import { getDict } from "./dict";
import { digits, num, price } from "@/lib/format";

export function makeI18n(lang: Lang) {
  return {
    lang,
    t: getDict(lang),
    /** localized digits */
    d: (v: number | string) => digits(lang, v),
    n: (v: number) => num(lang, v),
    price: (v: number) => price(lang, v),
    /** pick the current-language string */
    tx: (v: L) => v[lang],
    /** prefix an app path with the locale */
    href: (p: string) => `/${lang}${p === "/" ? "" : p}`,
    /** 09121234567 -> "0912 123 4567" in local digits */
    phone: (p: string) => digits(lang, `${p.slice(0, 4)} ${p.slice(4, 7)} ${p.slice(7)}`),
  };
}
export type I18n = ReturnType<typeof makeI18n>;

/** For server pages: resolve the [lang] route param */
export async function fromParams(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  return makeI18n(lang === "en" ? "en" : "fa");
}
