import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Handshake, ShieldCheck, Clock3 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { agents } from "@/data/agents";
import { fa } from "@/lib/format";

const cities = ["تهران", "اصفهان", "شیراز", "مشهد", "نوشهر", "کیش"];
const cityImg: Record<string, string> = {
  تهران: "1545324418-cc1a3fa10c00", اصفهان: "1570129477492-45c003edd2be", شیراز: "1582268611958-ebfd161ef9cf",
  مشهد: "1598228723793-52759bba239c", نوشهر: "1512917774080-9991f1c4c750", کیش: "1613490493576-7fde63acd811",
};

export default function Home() {
  const featured = listings.filter((l) => l.featured).slice(0, 6);
  const latest = [...listings].sort((a, b) => a.daysAgo - b.daysAgo).slice(0, 6);
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="pill bg-soft text-accent">بیش از {fa(2400)} ملک معتبر در سراسر ایران</p>
            <h1 className="mt-5 text-[2rem] font-bold leading-[1.5] sm:text-5xl sm:leading-[1.45]">خانه‌ای که دنبالش بودید،<br /><span className="text-accent">با اطمینان پیدا کنید</span></h1>
            <p className="mt-4 max-w-lg text-muted sm:text-lg">قیمت واقعی، اسناد بررسی‌شده و مشاورانی که تا روز تحویل کلید کنار شما هستند.</p>
            <dl className="mt-7 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
              {[["۱۴ سال", "تجربه"], ["۸٬۵۰۰", "معامله موفق"], ["۹۶٪", "رضایت مشتریان"]].map(([v, k]) => (
                <div key={k}><dt className="text-xs text-muted">{k}</dt><dd className="text-xl font-bold sm:text-2xl">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface2 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
            <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811" alt="ویلای مدرن با استخر" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="relative z-10 mt-8"><SearchBar /></div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="cities">
        <h2 id="cities" className="text-2xl font-bold">جستجو بر اساس شهر</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((c) => (
            <li key={c}>
              <Link href={`/listings?deal=sale&city=${c}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface2">
                <Image src={`https://images.unsplash.com/photo-${cityImg[c]}`} alt="" fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-2 bottom-2 rounded-xl bg-surface/95 px-3 py-2 text-sm leading-tight">
                  <b>{c}</b><br /><span className="text-xs text-muted">{fa(listings.filter((l) => l.city === c).length)} آگهی</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Block title="آگهی‌های ویژه" sub="انتخاب مشاوران ما این هفته" href="/listings?deal=sale">{featured.map((l) => <ListingCard key={l.id} l={l} />)}</Block>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="why">
        <h2 id="why" className="text-2xl font-bold">چرا املاک توافق؟</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[ShieldCheck, "اسناد بررسی‌شده", "پیش از انتشار هر آگهی، مالکیت و وضعیت سند را بررسی می‌کنیم."], [BadgeCheck, "قیمت واقعی", "تحلیل قیمت بر پایه معاملات اخیر هر محله، نه قیمت‌گذاری هوایی."], [Handshake, "همراهی تا آخر", "از بازدید تا امضای قرارداد و تحویل، یک مشاور مسئول شماست."], [Clock3, "پاسخ‌گویی سریع", "درخواست‌های شما معمولا در کمتر از یک ساعت پاسخ داده می‌شود."]].map(([I, t, d]: any) => (
            <li key={t} className="rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft text-accent"><I size={22} aria-hidden /></span>
              <h3 className="mt-4 font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <Block title="تازه‌ترین آگهی‌ها" sub="جدیدترین ملک‌های ثبت‌شده" href="/listings?deal=rent" linkLabel="مشاهده اجاره‌ها">{latest.map((l) => <ListingCard key={l.id} l={l} />)}</Block>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="ag">
        <div className="flex items-end justify-between gap-4"><h2 id="ag" className="text-2xl font-bold">مشاوران ما</h2>
          <Link href="/agents" className="ctl text-sm text-accent hover:underline">همه مشاوران<ArrowLeft size={16} aria-hidden /></Link></div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {agents.slice(0, 4).map((a) => (
            <li key={a.id} className="rounded-2xl border border-line bg-surface p-4 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-soft text-xl font-bold text-accent pt-1">{a.name[0]}</span>
              <h3 className="mt-3 text-sm font-bold sm:text-base">{a.name}</h3><p className="text-xs text-muted">{a.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-accent px-6 py-10 text-accent-ink sm:flex-row sm:items-center sm:px-10">
          <div><h2 className="text-2xl font-bold">ملک خود را می‌فروشید یا اجاره می‌دهید؟</h2><p className="mt-1 opacity-90">ارزیابی رایگان قیمت، همین امروز.</p></div>
          <Link href="/contact" className="btn ctl bg-surface text-ink hover:bg-bg">درخواست ارزیابی رایگان</Link>
        </div>
      </section>
    </>
  );
}

function Block({ title, sub, href, linkLabel = "مشاهده همه", children }: { title: string; sub: string; href: string; linkLabel?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-label={title}>
      <div className="flex items-end justify-between gap-4">
        <div><h2 className="text-2xl font-bold">{title}</h2><p className="text-sm text-muted">{sub}</p></div>
        <Link href={href} className="ctl shrink-0 text-sm text-accent hover:underline">{linkLabel}<ArrowLeft size={16} aria-hidden /></Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
