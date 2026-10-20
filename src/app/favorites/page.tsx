import type { Metadata } from "next";
import FavoritesView from "@/components/FavoritesView";

export const metadata: Metadata = { title: "ذخیره‌شده‌ها" };
export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">آگهی‌های ذخیره‌شده</h1>
      <p className="mt-2 text-muted">این لیست فقط روی همین مرورگر ذخیره می‌شود.</p>
      <FavoritesView />
    </div>
  );
}
