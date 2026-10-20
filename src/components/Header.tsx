"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, House, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "@/lib/providers";
import { fa } from "@/lib/format";

const links = [
  { href: "/", label: "خانه" },
  { href: "/listings?deal=sale", label: "خرید", match: "sale" },
  { href: "/listings?deal=rent", label: "رهن و اجاره", match: "rent" },
  { href: "/agents", label: "مشاوران" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { ids } = useFavorites();
  const [hidden, setHidden] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const out = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", esc); };
  }, [open]);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 80);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const active = (l: (typeof links)[number]) => (l.match ? false : l.href === "/" ? path === "/" : path.startsWith(l.href));
  return (
    <header ref={ref} className={`sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur transition-transform duration-300 ${hidden && !open ? "-translate-y-full" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 sm:gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-ink"><House size={21} aria-hidden /></span>
          <span className="whitespace-nowrap text-lg leading-none pt-1">املاک توافق</span>
        </Link>
        <nav aria-label="اصلی" className="ms-8 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-[0.95rem] transition-colors hover:text-accent ${active(l) ? "font-bold text-accent" : "text-muted"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <Link href="/favorites" aria-label={`ذخیره‌شده‌ها${ids.length ? ` (${fa(ids.length)})` : ""}`}
            className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-line bg-surface transition-colors hover:border-accent hover:text-accent">
            <Heart size={19} aria-hidden />
            {ids.length > 0 && <span className="absolute -top-1.5 -end-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] leading-none text-accent-ink pt-0.5">{fa(ids.length)}</span>}
          </Link>
          <ThemeToggle />
          <button className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-line bg-surface md:hidden" aria-expanded={open} aria-controls="mnav" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen(!open)}>
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mnav" aria-label="موبایل" className="border-t border-line bg-bg px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line/60 text-base last:border-0">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
