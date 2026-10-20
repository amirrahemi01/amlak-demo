"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import Select from "./Select";
import { CITIES, TYPES, type Deal } from "@/data/listings";
import { useI18n } from "@/lib/providers";
import type { I18n } from "@/i18n";
import { usd } from "@/lib/format";

export const PRICE_OPTS: Record<Deal, number[]> = {
  sale: [5000, 10000, 20000, 50000, 100000],
  rent: [500, 1000, 2000, 3000],
};
/** million toman -> "۵ میلیارد" (fa) / "$50K" (en) */
export const priceOptLabel = ({ d, t, lang }: I18n, m: number) =>
  lang === "en" ? usd(m * 1e6, true) : m >= 1000 ? `${d(m / 1000)} ${t.search.billion}` : `${d(m)} ${t.search.million}`;

export function useFilterOptions() {
  const i = useI18n();
  const { t, tx } = i;
  return {
    cities: [{ value: "", label: t.search.allCities }, ...Object.entries(CITIES).map(([k, c]) => ({ value: k, label: tx(c) }))],
    hoods: (city: string) => [{ value: "", label: t.search.allHoods }, ...Object.entries(CITIES[city]?.hoods ?? {}).map(([k, h]) => ({ value: k, label: tx(h) }))],
    types: [{ value: "", label: t.search.allTypes }, ...Object.entries(TYPES).map(([k, v]) => ({ value: k, label: tx(v) }))],
    prices: (deal: Deal) => [{ value: "", label: t.search.noLimit }, ...PRICE_OPTS[deal].map((m) => ({ value: String(m), label: t.search.upTo(priceOptLabel(i, m)) }))],
  };
}

export default function SearchBar() {
  const r = useRouter();
  const { t, href } = useI18n();
  const opts = useFilterOptions();
  const [deal, setDeal] = useState<Deal>("sale");
  const [f, setF] = useState({ city: "", type: "", max: "" });
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ deal });
    Object.entries(f).forEach(([k, v]) => v && p.set(k, v));
    r.push(href(`/listings?${p}`));
  };
  return (
    <form onSubmit={go} className="rounded-2xl border border-line bg-surface p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.45)] sm:p-4">
      <div role="tablist" aria-label={t.deal.dealType} className="mb-3 inline-flex rounded-xl bg-surface2 p-1">
        {(["sale", "rent"] as Deal[]).map((dl) => (
          <button key={dl} type="button" role="tab" aria-selected={deal === dl} onClick={() => { setDeal(dl); setF({ ...f, max: "" }); }}
            className={`ctl min-h-10 rounded-lg px-5 text-sm font-medium transition-colors ${deal === dl ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}>
            {dl === "sale" ? t.deal.buyTab : t.deal.rent}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <Select label={t.search.city} value={f.city} onChange={(v) => setF({ ...f, city: v })} options={opts.cities} />
        <Select label={t.search.type} value={f.type} onChange={(v) => setF({ ...f, type: v })} options={opts.types} />
        <Select label={deal === "sale" ? t.search.maxPrice : t.search.maxDeposit} value={f.max} onChange={(v) => setF({ ...f, max: v })} options={opts.prices(deal)} />
        <button className="btn btn-primary ctl self-end sm:col-span-2 lg:col-span-1"><Search size={18} aria-hidden />{t.search.go}</button>
      </div>
    </form>
  );
}
