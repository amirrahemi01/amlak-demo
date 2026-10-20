import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-4 py-24 text-center">
      <p className="text-7xl font-bold text-accent">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-bold">این صفحه پیدا نشد</h1>
      <p className="mt-2 text-muted">شاید آگهی فروخته شده یا آدرس اشتباه است. از صفحه اصلی دوباره جستجو کنید.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary ctl">صفحه اصلی</Link>
        <Link href="/listings?deal=sale" className="btn btn-ghost ctl">دیدن آگهی‌ها</Link>
      </div>
    </div>
  );
}
