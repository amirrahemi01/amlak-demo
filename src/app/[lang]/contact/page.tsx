import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { fromParams } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  return { title: (await fromParams(params)).t.contact.title };
}
export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const { t, d } = await fromParams(params);
  const c = t.contact;
  const info = [[MapPin, c.address, c.addressV, false], [Phone, c.phone, d("021 2200 1123"), true], [Mail, c.email, "info@amlak-demo.ir", true], [Clock, c.hours, c.hoursV, false]] as const;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-3 text-muted">{c.sub}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <ul className="grid gap-3 self-start">
          {info.map(([I, k, v, ltr]) => (
            <li key={k} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-accent"><I size={21} aria-hidden /></span>
              <div><div className="text-sm text-muted">{k}</div><div className="font-medium" dir={ltr ? "ltr" : undefined}>{v}</div></div>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6"><ContactForm /></div>
      </div>
    </div>
  );
}
