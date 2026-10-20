"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import Select from "./Select";
import { CITIES, TYPE_LABEL, type Deal } from "@/data/listings";

export const PRICE_OPTS: Record<Deal, number[]> = {
  sale: [5000, 10000, 20000, 50000, 100000],
  rent: [500, 1000, 2000, 3000],
};
export const priceOptLabel = (m: number) => (m >= 1000 ? `${m / 1000} میلیارد` : `${m} میلیون`).replace(/\d+(\.\d+)?/, (d) => d.replace(/\d/g, (x) => "۰۱۲۳۴۵۶۷۸۹"[+x]).replace(".", "٫"));

export default function SearchBar() {
  const r = useRouter();
  const [deal, setDeal] = useState<Deal>("sale");
  const [f, setF] = useState({ city: "", type: "", max: "" });
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ deal });
    Object.entries(f).forEach(([k, v]) => v && p.set(k, v));
    r.push(`/listings?${p}`);
  };
  return (
    <form onSubmit={go} className="rounded-2xl border border-line bg-surface p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.45)] sm:p-4">
      <div role="tablist" aria-label="نوع معامله" className="mb-3 inline-flex rounded-xl bg-surface2 p-1">
        {(["sale", "rent"] as Deal[]).map((d) => (
          <button key={d} type="button" role="tab" aria-selected={deal === d} onClick={() => { setDeal(d); setF({ ...f, max: "" }); }}
            className={`ctl min-h-10 rounded-lg px-5 text-sm font-medium transition-colors ${deal === d ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}>
            {d === "sale" ? "خرید" : "رهن و اجاره"}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <Select label="شهر" value={f.city} onChange={(v) => setF({ ...f, city: v })} options={[{ value: "", label: "همه شهرها" }, ...Object.keys(CITIES).map((c) => ({ value: c, label: c }))]} />
        <Select label="نوع ملک" value={f.type} onChange={(v) => setF({ ...f, type: v })} options={[{ value: "", label: "همه انواع" }, ...Object.entries(TYPE_LABEL).map(([k, v]) => ({ value: k, label: v }))]} />
        <Select label={deal === "sale" ? "سقف قیمت" : "سقف ودیعه"} value={f.max} onChange={(v) => setF({ ...f, max: v })} options={[{ value: "", label: "بدون محدودیت" }, ...PRICE_OPTS[deal].map((m) => ({ value: String(m), label: `تا ${priceOptLabel(m)} تومان` }))]} />
        <button className="btn btn-primary ctl self-end sm:col-span-2 lg:col-span-1"><Search size={18} aria-hidden />جستجو</button>
      </div>
    </form>
  );
}
