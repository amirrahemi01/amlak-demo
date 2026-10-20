import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { agents } from "@/data/agents";
import { listings } from "@/data/listings";
import { fromParams } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/agents">): Promise<Metadata> {
  return { title: (await fromParams(params)).t.agents.meta };
}
export default async function Page({ params }: PageProps<"/[lang]/agents">) {
  const { t, d, tx, href, phone } = await fromParams(params);
  const a = t.agents;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">{a.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{a.text}</p>
      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {a.stats.map(([v, k]) => (
          <div key={k} className="flex flex-col-reverse rounded-2xl border border-line bg-surface p-5"><dt className="text-sm text-muted">{k}</dt><dd className="text-3xl font-bold text-accent">{v}</dd></div>
        ))}
      </dl>
      <h2 className="mt-14 text-2xl font-bold">{a.team}</h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((ag) => (
          <li key={ag.id} className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/60">
            <div className="flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-soft pt-1 text-2xl font-bold text-accent">{tx(ag.name)[0]}</span>
              <div><h3 className="font-bold">{tx(ag.name)}</h3><p className="text-sm text-muted">{tx(ag.role)}</p></div>
            </div>
            <p className="mt-4 text-sm text-muted">{tx(ag.bio)}</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm"><MapPin size={16} className="shrink-0 text-accent" aria-hidden />{tx(ag.areas)}</p>
            <p className="mt-1 text-sm text-muted">{a.meta2(d(ag.years), d(listings.filter((l) => l.agent === ag.id).length))}</p>
            <a href={`tel:${ag.phone}`} className="btn btn-ghost ctl mt-4 w-full"><Phone size={17} aria-hidden /><span dir="ltr">{phone(ag.phone)}</span></a>
          </li>
        ))}
      </ul>
      <div className="mt-12 text-center"><Link href={href("/contact")} className="btn btn-primary ctl">{a.cta}</Link></div>
    </div>
  );
}
