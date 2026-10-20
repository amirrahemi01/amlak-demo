import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "تماس با ما" };
export default function Page() {
  const info = [[MapPin, "آدرس", "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۰"], [Phone, "تلفن", "۰۲۱ ۲۲۰۰ ۱۱۲۳"], [Mail, "ایمیل", "info@amlak-demo.ir"], [Clock, "ساعت کاری", "شنبه تا پنجشنبه، ۹ تا ۱۸"]] as const;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">تماس با ما</h1>
      <p className="mt-3 text-muted">پیام بگذارید یا زنگ بزنید؛ معمولا ظرف یک ساعت پاسخ می‌دهیم.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ul className="grid gap-3 self-start">
          {info.map(([I, k, v]) => (
            <li key={k} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-accent"><I size={21} aria-hidden /></span>
              <div><div className="text-sm text-muted">{k}</div><div className="font-medium">{v}</div></div>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6"><ContactForm /></div>
      </div>
    </div>
  );
}
