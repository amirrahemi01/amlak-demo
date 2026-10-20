import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Vazirmatn } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/lib/providers";
import { dirOf, isLang, locales } from "@/i18n/config";
import { getDict } from "@/i18n/dict";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-vazir", display: "swap" });

export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: `%s | ${t.brand}` },
    description: t.meta.desc,
    alternates: { languages: { fa: "/fa", en: "/en" } },
  };
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f8f9f7" }, { media: "(prefers-color-scheme: dark)", color: "#121614" }] };

const themeInit = `try{var t=localStorage.getItem("amlak:theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} dir={dirOf(lang)} className={vazir.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">{t.skip}</a>
        <Providers lang={lang}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
