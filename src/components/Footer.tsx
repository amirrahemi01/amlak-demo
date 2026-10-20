"use client";
import Link from "next/link";
import { House, MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/lib/providers";

export default function Footer() {
  const { t, href, d } = useI18n();
  const f = t.footer;
  return (
    <footer className="mt-20 border-t border-line bg-surface2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-ink"><House size={21} aria-hidden /></span>
            <span className="pt-1">{t.brand}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">{f.about}</p>
        </div>
        <div>
          <h2 className="mb-3 font-bold">{f.quick}</h2>
          <ul className="space-y-1 text-sm text-muted">
            {[["/listings?deal=sale", f.buy], ["/listings?deal=rent", f.rent], ["/agents", f.agents], ["/favorites", t.favs], ["/contact", t.nav.contact]].map(([h, l]) => (
              <li key={h}><Link href={href(h)} className="inline-block py-1 hover:text-accent">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold">{f.contactTitle}</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2"><MapPin size={17} className="mt-1.5 shrink-0" aria-hidden />{t.contact.addressV}</li>
            <li className="flex items-center gap-2"><Phone size={17} aria-hidden /><span dir="ltr">{d("021 2200 1123")}</span></li>
            <li className="flex items-center gap-2"><Mail size={17} aria-hidden /><span dir="ltr">info@amlak-demo.ir</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        <p>{f.demo}</p>
        <p className="mt-1">{f.credit} <a href="https://amirrahemi.com" target="_blank" rel="noopener noreferrer" className="inline-block py-1 font-medium text-accent hover:underline">{f.dev}</a></p>
      </div>
    </footer>
  );
}
