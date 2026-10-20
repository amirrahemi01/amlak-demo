import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Bath, BedDouble, Calendar, Car, Check, ChevronRight, Layers, MapPin, Phone, Ruler } from "lucide-react";
import Gallery from "@/components/Gallery";
import HeartButton from "@/components/HeartButton";
import ListingCard, { PriceTag } from "@/components/ListingCard";
import ContactForm from "@/components/ContactForm";
import { CITIES, FEATURES, TYPES, getListing, listings, placeName } from "@/data/listings";
import { agents } from "@/data/agents";
import { locales } from "@/i18n/config";
import { fromParams } from "@/i18n";

export const generateStaticParams = () => locales.flatMap((lang) => listings.map((l) => ({ lang, id: l.id })));

export async function generateMetadata({ params }: PageProps<"/[lang]/listings/[id]">): Promise<Metadata> {
  const { t, tx, lang } = await fromParams(params);
  const l = getListing((await params).id);
  return { title: l ? `${tx(l.title)} – ${placeName(l, lang)}` : t.detail.notFound };
}

export default async function Page({ params }: PageProps<"/[lang]/listings/[id]">) {
  const { t, d, tx, href, phone, lang } = await fromParams(params);
  const l = getListing((await params).id);
  if (!l) notFound();
  const agent = agents[l.agent];
  const dt = t.detail;
  const similar = listings.filter((x) => x.id !== l.id && x.deal === l.deal && (x.city === l.city || x.type === l.type)).slice(0, 3);
  const floor = !l.floor ? "—" : l.floor[0] === 0 ? dt.ground : l.floor[1] ? `${d(l.floor[0])} ${dt.of} ${d(l.floor[1])}` : d(l.floor[0]);
  const facts = [
    [Ruler, dt.area, `${d(l.area)} ${t.card.m2}`], [BedDouble, dt.beds, d(l.rooms)], [Bath, dt.baths, d(l.baths)], [Car, dt.parking, l.parking ? d(l.parking) : dt.none],
    [Calendar, dt.year, lang === "fa" ? d(l.year) : String(l.year + 621)], [Layers, dt.floor, floor],
  ] as const;
  const crumb = <ChevronRight size={14} aria-hidden className="rtl:-scale-x-100" />;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav aria-label={dt.breadcrumb} className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href={href("/")} className="hover:text-accent">{t.nav.home}</Link>{crumb}
        <Link href={href(`/listings?deal=${l.deal}`)} className="hover:text-accent">{t.deal[l.deal]}</Link>{crumb}
        <span className="text-ink">{tx(CITIES[l.city].hoods[l.hood])}</span>
      </nav>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0">
          <Gallery images={l.images} alt={tx(l.title)} />
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex gap-2"><span className="pill bg-accent text-accent-ink">{t.deal[l.deal]}</span><span className="pill bg-surface2">{tx(TYPES[l.type])}</span></div>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{tx(l.title)}</h1>
              <p className="mt-1 flex items-center gap-1 text-muted"><MapPin size={17} aria-hidden />{placeName(l, lang)}</p>
            </div>
            <HeartButton id={l.id} className="shrink-0 border border-line" />
          </div>
          <div className="mt-5 rounded-2xl border border-line bg-surface p-5"><PriceTag l={l} big /></div>

          <h2 className="mt-10 text-xl font-bold">{dt.specs}</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(([I, k, v]) => (
              <div key={k} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-soft text-accent"><I size={19} aria-hidden /></span>
                <div><dt className="text-xs text-muted">{k}</dt><dd className="font-bold">{v}</dd></div>
              </div>
            ))}
          </dl>

          <h2 className="mt-10 text-xl font-bold">{dt.desc}</h2>
          <p className="mt-3 text-muted">{tx(l.desc)}</p>

          <h2 className="mt-10 text-xl font-bold">{dt.features}</h2>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {l.features.map((f) => <li key={f} className="flex items-center gap-2"><Check size={17} className="shrink-0 text-accent" aria-hidden />{tx(FEATURES[f])}</li>)}
          </ul>

          <h2 className="mt-10 text-xl font-bold">{dt.location}</h2>
          <div className="relative mt-4 grid h-52 place-items-center overflow-hidden rounded-2xl border border-line bg-surface2" role="img" aria-label={dt.locationAria(placeName(l, lang))}>
            <svg className="absolute inset-0 h-full w-full text-line" aria-hidden>
              <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1.5" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#g)" />
              <path d="M-10 150 L300 70 L700 120" stroke="currentColor" strokeWidth="14" fill="none" />
            </svg>
            <div className="relative text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink"><MapPin size={24} aria-hidden /></span>
              <span className="mt-2 inline-block rounded-lg bg-surface px-3 py-1 text-sm">{placeName(l, lang)}</span></div>
          </div>
          <p className="mt-2 text-xs text-muted">{dt.locationNote}</p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label={dt.contactAgent}>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-soft pt-1 text-lg font-bold text-accent">{tx(agent.name)[0]}</span>
              <div><div className="font-bold">{tx(agent.name)}</div><div className="text-sm text-muted">{tx(agent.role)}</div></div>
            </div>
            <a href={`tel:${agent.phone}`} className="btn btn-ghost ctl mt-4 w-full"><Phone size={17} aria-hidden /><span dir="ltr">{phone(agent.phone)}</span></a>
            <div className="my-4 border-t border-line" />
            <h2 className="mb-3 font-bold">{dt.visit}</h2>
            <ContactForm compact subject={dt.subject(tx(l.title), d(l.id))} cta={dt.visitCta} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16" aria-labelledby="sim"><h2 id="sim" className="text-xl font-bold">{dt.similar}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <ListingCard key={s.id} l={s} />)}</div></section>
      )}
    </div>
  );
}
