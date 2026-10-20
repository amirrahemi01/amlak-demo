import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, ShieldCheck, Clock3 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { CITIES, listings } from "@/data/listings";
import { agents } from "@/data/agents";
import { fromParams } from "@/i18n";

const cityImg: Record<string, string> = {
  tehran: "1545324418-cc1a3fa10c00", isfahan: "1570129477492-45c003edd2be", shiraz: "1582268611958-ebfd161ef9cf",
  mashhad: "1598228723793-52759bba239c", nowshahr: "1512917774080-9991f1c4c750", kish: "1613490493576-7fde63acd811",
};
const whyIcons = [ShieldCheck, BadgeCheck, Handshake, Clock3];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { t, d, tx, href, n } = await fromParams(params);
  const h = t.home;
  const featured = listings.filter((l) => l.featured).slice(0, 6);
  const latest = [...listings].sort((a, b) => a.daysAgo - b.daysAgo).slice(0, 6);
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="pill bg-soft text-accent">{h.badge(n(2400))}</p>
            <h1 className="mt-5 text-[2rem] font-bold leading-[1.5] sm:text-5xl sm:leading-[1.45]">{h.h1a}<br /><span className="text-accent">{h.h1b}</span></h1>
            <p className="mt-4 max-w-lg text-muted sm:text-lg">{h.sub}</p>
            <dl className="mt-7 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
              {h.stats.map(([v, k]) => (
                <div key={k}><dt className="text-xs text-muted">{k}</dt><dd className="text-xl font-bold sm:text-2xl">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface2 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
            <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811" alt={h.heroAlt} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="relative z-10 mt-8"><SearchBar /></div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="cities">
        <h2 id="cities" className="text-2xl font-bold">{h.byCity}</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.keys(cityImg).map((c) => (
            <li key={c}>
              <Link href={href(`/listings?deal=sale&city=${c}`)} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface2">
                <Image src={`https://images.unsplash.com/photo-${cityImg[c]}`} alt="" fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-2 bottom-2 rounded-xl bg-surface/95 px-3 py-2 text-sm leading-tight">
                  <b>{tx(CITIES[c])}</b><br /><span className="text-xs text-muted">{h.count(d(listings.filter((l) => l.city === c).length))}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Block title={h.featured} sub={h.featuredSub} href={href("/listings?deal=sale")} linkLabel={h.seeAll}>{featured.map((l) => <ListingCard key={l.id} l={l} />)}</Block>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="why">
        <h2 id="why" className="text-2xl font-bold">{h.why}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.whyItems.map(([title, text], i) => {
            const I = whyIcons[i];
            return (
              <li key={title} className="rounded-2xl border border-line bg-surface p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft text-accent"><I size={22} aria-hidden /></span>
                <h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <Block title={h.latest} sub={h.latestSub} href={href("/listings?deal=rent")} linkLabel={h.seeRentals}>{latest.map((l) => <ListingCard key={l.id} l={l} />)}</Block>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="ag">
        <div className="flex items-end justify-between gap-4"><h2 id="ag" className="text-2xl font-bold">{h.agents}</h2>
          <Link href={href("/agents")} className="ctl text-sm text-accent hover:underline">{h.allAgents}<ArrowRight size={16} aria-hidden className="rtl:-scale-x-100" /></Link></div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {agents.slice(0, 4).map((a) => (
            <li key={a.id} className="rounded-2xl border border-line bg-surface p-4 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-soft pt-1 text-xl font-bold text-accent">{tx(a.name)[0]}</span>
              <h3 className="mt-3 text-sm font-bold sm:text-base">{tx(a.name)}</h3><p className="text-xs text-muted">{tx(a.role)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-accent px-6 py-10 text-accent-ink sm:flex-row sm:items-center sm:px-10">
          <div><h2 className="text-2xl font-bold">{h.ctaTitle}</h2><p className="mt-1 opacity-90">{h.ctaSub}</p></div>
          <Link href={href("/contact")} className="btn ctl bg-surface text-ink hover:bg-bg">{h.ctaBtn}</Link>
        </div>
      </section>
    </>
  );
}

function Block({ title, sub, href, linkLabel, children }: { title: string; sub: string; href: string; linkLabel: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-label={title}>
      <div className="flex items-end justify-between gap-4">
        <div><h2 className="text-2xl font-bold">{title}</h2><p className="text-sm text-muted">{sub}</p></div>
        <Link href={href} className="ctl shrink-0 text-sm text-accent hover:underline">{linkLabel}<ArrowRight size={16} aria-hidden className="rtl:-scale-x-100" /></Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
