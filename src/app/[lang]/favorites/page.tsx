import type { Metadata } from "next";
import FavoritesView from "@/components/FavoritesView";
import { fromParams } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/favorites">): Promise<Metadata> {
  return { title: (await fromParams(params)).t.fav.title };
}
export default async function Page({ params }: PageProps<"/[lang]/favorites">) {
  const { t } = await fromParams(params);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">{t.fav.title}</h1>
      <p className="mt-2 text-muted">{t.fav.note}</p>
      <FavoritesView />
    </div>
  );
}
