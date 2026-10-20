import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { agents } from "@/data/agents";
import { listings } from "@/data/listings";
import { fa } from "@/lib/format";

export const metadata: Metadata = { title: "مشاوران و درباره ما" };
export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">درباره املاک توافق</h1>
      <p className="mt-3 max-w-2xl text-muted">از سال ۱۳۹۱ به خریداران، فروشندگان و مستاجران کمک می‌کنیم معامله‌ای شفاف و بی‌دغدغه داشته باشند. باور ما ساده است: مشاور خوب اول گوش می‌دهد، بعد پیشنهاد می‌دهد.</p>
      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["۱۴", "سال تجربه"], ["۸٬۵۰۰", "معامله موفق"], ["۶", "مشاور متخصص"], ["۹", "شهر تحت پوشش"]].map(([v, k]) => (
          <div key={k} className="rounded-2xl border border-line bg-surface p-5"><dd className="text-3xl font-bold text-accent">{v}</dd><dt className="text-sm text-muted">{k}</dt></div>
        ))}
      </dl>
      <h2 className="mt-14 text-2xl font-bold">تیم مشاوران</h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <li key={a.id} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/60">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-soft text-2xl font-bold text-accent pt-1">{a.name[0]}</span>
              <div><h3 className="font-bold">{a.name}</h3><p className="text-sm text-muted">{a.role}</p></div>
            </div>
            <p className="mt-4 text-sm text-muted">{a.bio}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm"><MapPin size={16} className="text-accent" aria-hidden />{a.areas}</p>
            <p className="mt-1 text-sm text-muted">{fa(a.years)} سال سابقه · {fa(listings.filter((l) => l.agent === a.id).length)} آگهی فعال</p>
            <a href={`tel:${a.phone}`} className="btn btn-ghost ctl mt-4 w-full"><Phone size={17} aria-hidden /><span dir="ltr">{a.phone}</span></a>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center"><Link href="/contact" className="btn btn-primary ctl">با ما در تماس باشید</Link></div>
    </div>
  );
}
