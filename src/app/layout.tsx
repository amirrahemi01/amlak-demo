import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/lib/providers";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-vazir", display: "swap" });

export const metadata: Metadata = {
  title: { default: "املاک توافق | خرید، فروش و اجاره ملک", template: "%s | املاک توافق" },
  description: "جستجوی ساده و مطمئن ملک: آپارتمان، ویلا، خانه ویلایی و املاک تجاری در تهران و شهرهای ایران. (نسخه نمایشی)",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f6f4ef" }, { media: "(prefers-color-scheme: dark)", color: "#121614" }] };

const themeInit = `try{var t=localStorage.getItem("amlak:theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">رفتن به محتوا</a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
