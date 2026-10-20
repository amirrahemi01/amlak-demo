"use client";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import HeartButton from "./HeartButton";
import { CITIES, TYPES, placeName, type Listing } from "@/data/listings";
import { useI18n } from "@/lib/providers";

export function PriceTag({ l, big = false }: { l: Listing; big?: boolean }) {
  const { t, price } = useI18n();
  return l.deal === "sale" ? (
    <div className={`font-bold ${big ? "text-3xl" : "text-lg"}`}>{price(l.price)}</div>
  ) : (
    <div>
      <div className={`font-bold ${big ? "text-3xl" : "text-lg"}`}>{price(l.price)} <span className="text-sm font-normal text-muted">{t.card.deposit}</span></div>
      <div className={`${big ? "text-lg" : "text-sm"} text-muted`}>{t.card.monthly} {price(l.rent!)}</div>
    </div>
  );
}


export default function ListingCard({ l, priority = false }: { l: Listing; priority?: boolean }) {
  const { t, d, tx, href, lang } = useI18n();
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_30px_-14px_rgba(0,0,0,.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        <Image src={l.images[0]} alt={`${tx(TYPES[l.type])}, ${tx(CITIES[l.city].hoods[l.hood])}, ${tx(CITIES[l.city])}`} fill priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`pill absolute start-3 top-3 ${l.deal === "sale" ? "bg-accent text-accent-ink" : "bg-ink text-bg"}`}>{t.deal[l.deal]}</span>
        <HeartButton id={l.id} className="absolute end-3 top-3 z-10" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-bold">
          <Link href={href(`/listings/${l.id}`)} className="after:absolute after:inset-0 after:content-['']">{tx(l.title)}</Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin size={15} aria-hidden />{placeName(l, lang)}</p>
        <div className="mt-3"><PriceTag l={l} /></div>
        <ul className="mt-4 flex items-center justify-between gap-2 whitespace-nowrap border-t border-line pt-3 text-[13px] text-muted">
          <li className="flex items-center gap-1"><Ruler size={16} aria-hidden />{d(l.area)} {t.card.m2}</li>
          <li className="flex items-center gap-1"><BedDouble size={16} aria-hidden />{d(l.rooms)} {t.card.beds}</li>
          <li className="flex items-center gap-1"><Bath size={16} aria-hidden />{d(l.baths)} {t.card.baths}</li>
        </ul>
      </div>
    </article>
  );
}
