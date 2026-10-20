import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import HeartButton from "./HeartButton";
import { DEAL_LABEL, TYPE_LABEL, type Listing } from "@/data/listings";
import { fa, price } from "@/lib/format";

export function PriceTag({ l, big = false }: { l: Listing; big?: boolean }) {
  return l.deal === "sale" ? (
    <div className={`font-bold ${big ? "text-3xl" : "text-lg"}`}>{price(l.price)}</div>
  ) : (
    <div>
      <div className={`font-bold ${big ? "text-3xl" : "text-lg"}`}>{price(l.price)} <span className="text-sm font-normal text-muted">ودیعه</span></div>
      <div className={`${big ? "text-lg" : "text-sm"} text-muted`}>اجاره ماهانه {price(l.rent!)}</div>
    </div>
  );
}

export default function ListingCard({ l, priority = false }: { l: Listing; priority?: boolean }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_30px_-14px_rgba(0,0,0,.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface2">
        <Image src={`${l.images[0]}`} alt={`${TYPE_LABEL[l.type]} ${l.hood} ${l.city}`} fill priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={`pill absolute start-3 top-3 ${l.deal === "sale" ? "bg-accent text-accent-ink" : "bg-ink text-bg"}`}>{DEAL_LABEL[l.deal]}</span>
        <HeartButton id={l.id} className="absolute end-3 top-3 z-10" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-bold">
          <Link href={`/listings/${l.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-none">{l.title}</Link>
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted"><MapPin size={15} aria-hidden />{l.city}، {l.hood}</p>
        <div className="mt-3"><PriceTag l={l} /></div>
        <ul className="mt-4 flex items-center justify-between gap-2 whitespace-nowrap border-t border-line pt-3 text-[13px] text-muted">
          <li className="flex items-center gap-1"><Ruler size={16} aria-hidden />{fa(l.area)} متر</li>
          <li className="flex items-center gap-1"><BedDouble size={16} aria-hidden />{fa(l.rooms)} خواب</li>
          <li className="flex items-center gap-1"><Bath size={16} aria-hidden />{fa(l.baths)} سرویس</li>
        </ul>
      </div>
    </article>
  );
}
