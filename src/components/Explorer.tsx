"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchX, SlidersHorizontal } from "lucide-react";
import Select from "./Select";
import ListingCard from "./ListingCard";
import { PRICE_OPTS, priceOptLabel } from "./SearchBar";
import { CITIES, TYPE_LABEL, listings, type Deal } from "@/data/listings";
import { fa } from "@/lib/format";

const SORTS = { new: "جدیدترین", cheap: "ارزان‌ترین", exp: "گران‌ترین", area: "بیشترین متراژ" } as const;

export default function Explorer() {
  const sp = useSearchParams(); const r = useRouter(); const path = usePathname();
  const deal = (sp.get("deal") as Deal) || "sale";
  const city = sp.get("city") || ""; const hood = sp.get("hood") || ""; const type = sp.get("type") || "";
  const max = +(sp.get("max") || 0); const rooms = +(sp.get("rooms") || 0); const sort = (sp.get("sort") as keyof typeof SORTS) || "new";

  const [open, setOpen] = useState(false);
  const active = [city, hood, type, max, rooms].filter(Boolean).length;
  const set = (k: string, v: string) => {
    const p = new URLSearchParams(sp.toString());
    v ? p.set(k, v) : p.delete(k);
    if (k === "city") p.delete("hood");
    if (k === "deal") p.delete("max");
    r.replace(`${path}?${p}`, { scroll: false });
  };

  const items = useMemo(() => {
    const out = listings.filter((l) => l.deal === deal && (!city || l.city === city) && (!hood || l.hood === hood) && (!type || l.type === type) &&
      (!max || l.price <= max * 1e6) && (!rooms || l.rooms >= rooms));
    const by = { new: (a: any, b: any) => a.daysAgo - b.daysAgo, cheap: (a: any, b: any) => a.price - b.price, exp: (a: any, b: any) => b.price - a.price, area: (a: any, b: any) => b.area - a.area }[sort];
    return out.sort(by);
  }, [deal, city, hood, type, max, rooms, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside aria-label="فیلترها" className="h-fit lg:sticky lg:top-24 lg:rounded-2xl lg:border lg:border-line lg:bg-surface lg:p-4">
        <div className="flex items-center gap-2 lg:block">
          <div role="tablist" aria-label="نوع معامله" className="grid flex-1 grid-cols-2 rounded-xl bg-surface2 p-1 lg:mb-4">
            {(["sale", "rent"] as Deal[]).map((d) => (
              <button key={d} role="tab" aria-selected={deal === d} onClick={() => set("deal", d)}
                className={`ctl min-h-9 rounded-lg text-sm font-medium transition-colors ${deal === d ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}>{d === "sale" ? "خرید" : "رهن و اجاره"}</button>
            ))}
          </div>
        <button type="button" aria-expanded={open} aria-controls="filters" aria-label="فیلترها" onClick={() => setOpen(!open)} className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface transition-colors hover:border-accent lg:hidden"><SlidersHorizontal size={18} aria-hidden />{active > 0 && <span className="absolute -top-1.5 -end-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 pt-0.5 text-[11px] leading-none text-accent-ink">{fa(active)}</span>}</button>
        </div>
        <div id="filters" className={`${open ? "block" : "hidden"} mt-3 rounded-2xl border border-line bg-surface p-4 lg:mt-0 lg:block lg:border-0 lg:bg-transparent lg:p-0`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Select label="شهر" value={city} onChange={(v) => set("city", v)} options={[{ value: "", label: "همه شهرها" }, ...Object.keys(CITIES).map((c) => ({ value: c, label: c }))]} />
          <Select label="محله" value={hood} disabled={!city} onChange={(v) => set("hood", v)} options={[{ value: "", label: "همه محله‌ها" }, ...(CITIES[city] || []).map((h) => ({ value: h, label: h }))]} />
          <Select label="نوع ملک" value={type} onChange={(v) => set("type", v)} options={[{ value: "", label: "همه انواع" }, ...Object.entries(TYPE_LABEL).map(([k, v]) => ({ value: k, label: v }))]} />
          <Select label={deal === "sale" ? "سقف قیمت" : "سقف ودیعه"} value={max ? String(max) : ""} onChange={(v) => set("max", v)} options={[{ value: "", label: "بدون محدودیت" }, ...PRICE_OPTS[deal].map((m) => ({ value: String(m), label: `تا ${priceOptLabel(m)} تومان` }))]} />
        </div>
        <fieldset className="mt-4"><legend className="mb-1 text-xs text-muted">حداقل تعداد خواب</legend>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button key={n} aria-pressed={rooms === n} onClick={() => set("rooms", n ? String(n) : "")}
                className={`ctl h-11 flex-1 rounded-xl border text-sm transition-colors ${rooms === n ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent"}`}>{n ? <span dir="ltr">{fa(n)}+</span> : "همه"}</button>
            ))}
          </div>
        </fieldset>
        {active > 0 && <button onClick={() => r.replace(`${path}?deal=${deal}`, { scroll: false })} className="ctl mt-4 min-h-11 w-full rounded-xl text-sm text-accent hover:underline">پاک کردن فیلترها ({fa(active)})</button>}
        </div>
      </aside>

      <section aria-label="نتایج">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite"><b className="text-ink">{fa(items.length)}</b> آگهی پیدا شد</p>
          <Select compact className="w-44" value={sort} onChange={(v) => set("sort", v)} options={Object.entries(SORTS).map(([k, v]) => ({ value: k, label: v }))} />
        </div>
        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((l, i) => <ListingCard key={l.id} l={l} priority={i < 3} />)}</div>
        ) : (
          <div className="grid place-items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
            <SearchX size={36} className="text-muted" aria-hidden />
            <h2 className="mt-3 font-bold">ملکی با این شرایط پیدا نشد</h2>
            <p className="mt-1 text-sm text-muted">فیلترها را کمی باز کنید یا با مشاوران ما تماس بگیرید.</p>
            <Link href={`/listings?deal=${deal}`} className="btn btn-primary ctl mt-5">نمایش همه</Link>
          </div>
        )}
      </section>
    </div>
  );
}
