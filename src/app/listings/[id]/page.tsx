import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Bath, BedDouble, Calendar, Car, Check, ChevronLeft, Layers, MapPin, Phone, Ruler } from "lucide-react";
import Gallery from "@/components/Gallery";
import HeartButton from "@/components/HeartButton";
import ListingCard, { PriceTag } from "@/components/ListingCard";
import ContactForm from "@/components/ContactForm";
import { DEAL_LABEL, TYPE_LABEL, getListing, listings } from "@/data/listings";
import { agents } from "@/data/agents";
import { fa } from "@/lib/format";

export const generateStaticParams = () => listings.map((l) => ({ id: l.id }));
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const l = getListing((await params).id);
  return { title: l ? `${l.title} – ${l.hood}، ${l.city}` : "آگهی یافت نشد" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const l = getListing((await params).id);
  if (!l) notFound();
  const agent = agents[l.agent];
  const similar = listings.filter((x) => x.id !== l.id && x.deal === l.deal && (x.city === l.city || x.type === l.type)).slice(0, 3);
  const facts = [
    [Ruler, "متراژ", `${fa(l.area)} متر`], [BedDouble, "خواب", fa(l.rooms)], [Bath, "سرویس", fa(l.baths)], [Car, "پارکینگ", l.parking ? fa(l.parking) : "ندارد"],
    [Calendar, "سال ساخت", fa(l.year)], [Layers, "طبقه", l.floor ?? "—"],
  ] as const;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav aria-label="مسیر" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-accent">خانه</Link><ChevronLeft size={14} aria-hidden />
        <Link href={`/listings?deal=${l.deal}`} className="hover:text-accent">{DEAL_LABEL[l.deal]}</Link><ChevronLeft size={14} aria-hidden />
        <span className="text-ink">{l.hood}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0">
          <Gallery images={l.images} alt={l.title} />
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex gap-2"><span className="pill bg-accent text-accent-ink">{DEAL_LABEL[l.deal]}</span><span className="pill bg-surface2">{TYPE_LABEL[l.type]}</span></div>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{l.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-muted"><MapPin size={17} aria-hidden />{l.city}، {l.hood}</p>
            </div>
            <HeartButton id={l.id} className="border border-line" />
          </div>
          <div className="mt-5 rounded-2xl border border-line bg-surface p-5"><PriceTag l={l} big /></div>

          <h2 className="mt-10 text-xl font-bold">مشخصات</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(([I, k, v]) => (
              <div key={k} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-soft text-accent"><I size={19} aria-hidden /></span>
                <div><dt className="text-xs text-muted">{k}</dt><dd className="font-bold">{v}</dd></div>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-xl font-bold">توضیحات</h2>
          <p className="mt-3 text-muted">{l.desc}</p>

          <h2 className="mt-10 text-xl font-bold">امکانات</h2>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {l.features.map((f) => <li key={f} className="flex items-center gap-2"><Check size={17} className="text-accent" aria-hidden />{f}</li>)}
          </ul>

          <h2 className="mt-10 text-xl font-bold">موقعیت</h2>
          <div className="relative mt-4 grid h-52 place-items-center overflow-hidden rounded-2xl border border-line bg-surface2" role="img" aria-label={`موقعیت تقریبی ${l.hood}، ${l.city}`}>
            <svg className="absolute inset-0 h-full w-full text-line" aria-hidden>
              <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1.5" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#g)" />
              <path d="M-10 150 L300 70 L700 120" stroke="currentColor" strokeWidth="14" fill="none" />
            </svg>
            <div className="relative text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink"><MapPin size={24} aria-hidden /></span>
              <span className="mt-2 inline-block rounded-lg bg-surface px-3 py-1 text-sm">{l.hood}، {l.city}</span></div>
          </div>
          <p className="mt-2 text-xs text-muted">آدرس دقیق پس از هماهنگی بازدید اعلام می‌شود.</p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="تماس با مشاور">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-soft text-lg font-bold text-accent pt-1">{agent.name[0]}</span>
              <div><div className="font-bold">{agent.name}</div><div className="text-sm text-muted">{agent.role}</div></div>
            </div>
            <a href={`tel:${agent.phone}`} className="btn btn-ghost ctl mt-4 w-full"><Phone size={17} aria-hidden /><span dir="ltr">{agent.phone}</span></a>
            <div className="my-4 border-t border-line" />
            <h2 className="mb-3 font-bold">درخواست بازدید</h2>
            <ContactForm compact subject={`سلام، برای بازدید از «${l.title}» (کد ${fa(l.id)}) تماس بگیرید.`} cta="ثبت درخواست" />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16" aria-labelledby="sim"><h2 id="sim" className="text-xl font-bold">آگهی‌های مشابه</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <ListingCard key={s.id} l={s} />)}</div></section>
      )}
    </div>
  );
}
