"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, Heart, House, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useFavorites, useI18n } from "@/lib/providers";

const iconBtn = "grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-line bg-surface transition-colors hover:border-accent hover:text-accent";

export default function Header() {
  const { t, d, lang, href } = useI18n();
  const path = usePathname();
  const router = useRouter();
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

  const links = [
    { href: href("/"), label: t.nav.home, exact: true },
    { href: href("/listings?deal=sale"), label: t.nav.buy, query: true },
    { href: href("/listings?deal=rent"), label: t.nav.rent, query: true },
    { href: href("/agents"), label: t.nav.agents },
    { href: href("/contact"), label: t.nav.contact },
  ];
  const active = (l: (typeof links)[number]) => (l.query ? false : l.exact ? path === l.href : path.startsWith(l.href));

  // Same page in the other language, keeping the current filters
  const other = lang === "fa" ? "en" : "fa";
  const otherPath = path.replace(/^\/(fa|en)(?=\/|$)/, `/${other}`);
  const switchLang = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    router.push(otherPath + window.location.search);
  };

  return (
    <header ref={ref} className={`sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur transition-transform duration-300 ${hidden && !open ? "-translate-y-full" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href={href("/")} className="flex items-center gap-2.5 font-bold" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-ink"><House size={21} aria-hidden /></span>
          <span className="whitespace-nowrap pt-1 text-lg leading-none"><span className="sm:hidden">{t.brandShort}</span><span className="hidden sm:inline">{t.brand}</span></span>
        </Link>
        <nav aria-label={t.nav.main} className="ms-8 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-[0.95rem] transition-colors hover:text-accent ${active(l) ? "font-bold text-accent" : "text-muted"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <Link href={otherPath} onClick={switchLang} hrefLang={other} lang={other} aria-label={t.switchLangLabel}
            className="ctl hidden h-11 rounded-xl border border-line bg-surface px-3 text-sm transition-colors hover:border-accent hover:text-accent md:inline-flex">
            <Globe size={17} aria-hidden />{t.switchLang}
          </Link>
          <Link href={href("/favorites")} aria-label={`${t.favs}${ids.length ? ` (${d(ids.length)})` : ""}`} className={`relative ${iconBtn}`}>
            <Heart size={19} aria-hidden />
            {ids.length > 0 && <span className="absolute -end-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 pt-0.5 text-[11px] leading-none text-accent-ink">{d(ids.length)}</span>}
          </Link>
          <ThemeToggle />
          <button className={`${iconBtn} md:hidden`} aria-expanded={open} aria-controls="mnav" aria-label={open ? t.nav.closeMenu : t.nav.openMenu} onClick={() => setOpen(!open)}>
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mnav" aria-label={t.nav.mobile} className="border-t border-line bg-bg px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line/60 text-base">{l.label}</Link>
          ))}
          <Link href={otherPath} onClick={switchLang} hrefLang={other} lang={other} className="flex min-h-12 items-center gap-2 text-base text-accent">
            <Globe size={18} aria-hidden />{t.switchLang}
          </Link>
        </nav>
      )}
    </header>
  );
}
