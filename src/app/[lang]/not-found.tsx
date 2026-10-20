"use client";
import Link from "next/link";
import { useI18n } from "@/lib/providers";

export default function NotFound() {
  const { t, d, href } = useI18n();
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-4 py-24 text-center">
      <p className="text-7xl font-bold text-accent">{d(404)}</p>
      <h1 className="mt-4 text-2xl font-bold">{t.nf.title}</h1>
      <p className="mt-2 text-muted">{t.nf.text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href={href("/")} className="btn btn-primary ctl">{t.nf.home}</Link>
        <Link href={href("/listings?deal=sale")} className="btn btn-ghost ctl">{t.nf.browse}</Link>
      </div>
    </div>
  );
}
