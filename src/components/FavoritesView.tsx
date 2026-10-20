"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import ListingCard from "./ListingCard";
import { listings } from "@/data/listings";
import { useFavorites, useI18n } from "@/lib/providers";

export default function FavoritesView() {
  const { t, href } = useI18n();
  const { ids } = useFavorites();
  const items = listings.filter((l) => ids.includes(l.id));
  if (!items.length)
    return (
      <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
        <Heart size={36} className="text-muted" aria-hidden />
        <h2 className="mt-3 font-bold">{t.fav.emptyTitle}</h2>
        <p className="mt-1 text-sm text-muted">{t.fav.emptySub}</p>
        <Link href={href("/listings?deal=sale")} className="btn btn-primary ctl mt-5">{t.fav.browse}</Link>
      </div>
    );
  return <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((l) => <ListingCard key={l.id} l={l} />)}</div>;
}
