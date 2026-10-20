import { Suspense } from "react";
import type { Metadata } from "next";
import Explorer from "@/components/Explorer";
import { fromParams } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/listings">): Promise<Metadata> {
  return { title: (await fromParams(params)).t.explorer.title };
}
export default async function Page({ params }: PageProps<"/[lang]/listings">) {
  const { t } = await fromParams(params);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold">{t.explorer.title}</h1>
      <Suspense fallback={<div className="h-96 rounded-2xl bg-surface2" />}><Explorer /></Suspense>
    </div>
  );
}
