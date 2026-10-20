"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchX, SlidersHorizontal } from "lucide-react";
import Select from "./Select";
import ListingCard from "./ListingCard";
import { useFilterOptions } from "./SearchBar";
import { listings, type Deal, type Listing } from "@/data/listings";
import { useI18n } from "@/lib/providers";

type SortKey = "new" | "cheap" | "exp" | "area";
const SORTERS: Record<SortKey, (a: Listing, b: Listing) => number> = {
  new: (a, b) => a.daysAgo - b.daysAgo, cheap: (a, b) => a.price - b.price, exp: (a, b) => b.price - a.price, area: (a, b) => b.area - a.area,
};

export default function Explorer() {
  const { t, d, href } = useI18n();
  const opts = useFilterOptions();
  const sp = useSearchParams(); const r = useRouter(); const path = usePathname();
  const deal = (sp.get("deal") as Deal) === "rent" ? "rent" : "sale";
  const city = sp.get("city") || ""; const hood = sp.get("hood") || ""; const type = sp.get("type") || "";
  const max = +(sp.get("max") || 0); const rooms = +(sp.get("rooms") || 0);
  const sort = (sp.get("sort") as SortKey) in SORTERS ? (sp.get("sort") as SortKey) : "new";
  const [open, setOpen] = useState(false);
  const active = [city, hood, type, max, rooms].filter(Boolean).length;

  const set = (k: string, v: string) => {
    const p = new URLSearchParams(sp.toString());
    if (v) p.set(k, v); else p.delete(k);
    if (k === "city") p.delete("hood");
    if (k === "deal") p.delete("max");
    r.replace(`${path}?${p}`, { scroll: false });
  };

  const items = useMemo(() => listings
    .filter((l) => l.deal === deal && (!city || l.city === city) && (!hood || l.hood === hood) && (!type || l.type === type) && (!max || l.price <= max * 1e6) && (!rooms || l.rooms >= rooms))
    .sort(SORTERS[sort]), [deal, city, hood, type, max, rooms, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside aria-label={t.explorer.filters} className="h-fit lg:sticky lg:top-24 lg:rounded-2xl lg:border lg:border-line lg:bg-surface lg:p-4">
        <div className="flex items-center gap-2 lg:block">
          <div role="tablist" aria-label={t.deal.dealType} className="grid flex-1 grid-cols-2 rounded-xl bg-surface2 p-1 lg:mb-4">
            {(["sale", "rent"] as Deal[]).map((dl) => (
              <button key={dl} role="tab" aria-selected={deal === dl} onClick={() => set("deal", dl)}
                className={`ctl min-h-9 rounded-lg text-sm font-medium transition-colors ${deal === dl ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}>{dl === "sale" ? t.deal.buyTab : t.deal.rent}</button>
            ))}
          </div>
          <button type="button" aria-expanded={open} aria-controls="filters" aria-label={t.explorer.filters} onClick={() => setOpen(!open)} className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface transition-colors hover:border-accent lg:hidden">
            <SlidersHorizontal size={18} aria-hidden />
            {active > 0 && <span className="absolute -end-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 pt-0.5 text-[11px] leading-none text-accent-ink">{d(active)}</span>}
          </button>
        </div>
        <div id="filters" className={`${open ? "block" : "hidden"} mt-3 rounded-2xl border border-line bg-surface p-4 lg:mt-0 lg:block lg:border-0 lg:bg-transparent lg:p-0`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Select label={t.search.city} value={city} onChange={(v) => set("city", v)} options={opts.cities} />
            <Select label={t.search.hood} value={hood} disabled={!city} onChange={(v) => set("hood", v)} options={opts.hoods(city)} />
            <Select label={t.search.type} value={type} onChange={(v) => set("type", v)} options={opts.types} />
            <Select label={deal === "sale" ? t.search.maxPrice : t.search.maxDeposit} value={max ? String(max) : ""} onChange={(v) => set("max", v)} options={opts.prices(deal)} />
          </div>
          <fieldset className="mt-4"><legend className="mb-1 text-xs text-muted">{t.explorer.minBeds}</legend>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <button key={n} aria-pressed={rooms === n} onClick={() => set("rooms", n ? String(n) : "")}
                  className={`ctl h-11 flex-1 rounded-xl border text-sm transition-colors ${rooms === n ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent"}`}>{n ? <span dir="ltr">{d(n)}+</span> : t.explorer.all}</button>
              ))}
            </div>
          </fieldset>
          {active > 0 && <button onClick={() => r.replace(`${path}?deal=${deal}`, { scroll: false })} className="ctl mt-4 min-h-11 w-full rounded-xl text-sm text-accent hover:underline">{t.explorer.clear(d(active))}</button>}
        </div>
      </aside>

      <section aria-label={t.explorer.results}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">{t.explorer.found(d(items.length))}</p>
          <Select compact className="w-44" value={sort} onChange={(v) => set("sort", v)} options={(Object.keys(SORTERS) as SortKey[]).map((k) => ({ value: k, label: t.explorer.sort[k] }))} />
        </div>
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((l, i) => <ListingCard key={l.id} l={l} priority={i < 3} />)}</div>
        ) : (
          <div className="grid place-items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <SearchX size={36} className="text-muted" aria-hidden />
            <h2 className="mt-3 font-bold">{t.explorer.emptyTitle}</h2>
            <p className="mt-1 text-sm text-muted">{t.explorer.emptySub}</p>
            <Link href={href(`/listings?deal=${deal}`)} className="btn btn-primary ctl mt-5">{t.explorer.showAll}</Link>
          </div>
        )}
      </section>
    </div>
  );
}
