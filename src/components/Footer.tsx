import Link from "next/link";
import { House, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-ink"><House size={21} aria-hidden /></span>
            <span className="pt-1">املاک توافق</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">مشاوره صادقانه در خرید، فروش و اجاره ملک؛ با قیمت واقعی، اسناد شفاف و همراهی تا روز تحویل کلید.</p>
        </div>
        <div>
          <h2 className="mb-3 font-bold">دسترسی سریع</h2>
          <ul className="space-y-1 text-sm text-muted">
            {[["/listings?deal=sale", "خرید ملک"], ["/listings?deal=rent", "رهن و اجاره"], ["/agents", "مشاوران ما"], ["/favorites", "ذخیره‌شده‌ها"], ["/contact", "تماس با ما"]].map(([h, l]) => (
              <li key={h}><Link href={h} className="inline-block py-1 hover:text-accent">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold">ارتباط با ما</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2"><MapPin size={17} className="mt-1.5 shrink-0" aria-hidden />تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۰</li>
            <li className="flex items-center gap-2"><Phone size={17} aria-hidden /><span dir="ltr">۰۲۱ ۲۲۰۰ ۱۱۲۳</span></li>
            <li className="flex items-center gap-2"><Mail size={17} aria-hidden /><span dir="ltr">info@amlak-demo.ir</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted"><p>نسخه نمایشی؛ تمام آگهی‌ها و اطلاعات فرضی است. © ۱۴۰۵ املاک توافق</p>
        <p className="mt-1">طراحی و توسعه: <a href="https://amirrahemi.com" target="_blank" rel="noopener noreferrer" className="inline-block py-1 font-medium text-accent hover:underline">امیر راحمی</a></p></div>
    </footer>
  );
}
