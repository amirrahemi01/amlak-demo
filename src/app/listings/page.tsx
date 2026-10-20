import { Suspense } from "react";
import type { Metadata } from "next";
import Explorer from "@/components/Explorer";

export const metadata: Metadata = { title: "جستجوی ملک" };
export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold">جستجوی ملک</h1>
      <Suspense fallback={<div className="h-96 rounded-2xl bg-surface2" />}><Explorer /></Suspense>
    </div>
  );
}
