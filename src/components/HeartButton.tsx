"use client";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/providers";

export default function HeartButton({ id, className = "" }: { id: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const on = has(id);
  return (
    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id); }} aria-pressed={on}
      aria-label={on ? "حذف از ذخیره‌شده‌ها" : "ذخیره آگهی"}
      className={`grid h-11 w-11 place-items-center rounded-full bg-surface/95 text-ink shadow-sm transition hover:scale-105 hover:text-accent ${className}`}>
      <Heart size={19} aria-hidden className={on ? "fill-accent text-accent" : ""} />
    </button>
  );
}
