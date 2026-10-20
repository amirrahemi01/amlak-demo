"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fa } from "@/lib/format";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + images.length) % images.length);
  const arrow = "absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-ink shadow transition hover:text-accent";
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface2 sm:aspect-[16/10]">
        <Image key={i} src={`${images[i]}`} alt={`${alt} — تصویر ${fa(i + 1)}`} fill priority={i === 0} sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
        <button onClick={() => go(1)} aria-label="تصویر بعدی" className={`${arrow} end-3`}><ChevronLeft size={22} aria-hidden /></button>
        <button onClick={() => go(-1)} aria-label="تصویر قبلی" className={`${arrow} start-3`}><ChevronRight size={22} aria-hidden /></button>
        <span className="pill absolute bottom-3 start-3 bg-ink/85 text-bg">{fa(i + 1)} / {fa(images.length)}</span>
      </div>
      <ul className="mt-3 grid grid-cols-5 gap-2">
        {images.map((s, k) => (
          <li key={s}>
            <button onClick={() => setI(k)} aria-label={`نمایش تصویر ${fa(k + 1)}`} aria-current={k === i} className={`relative block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 transition ${k === i ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <Image src={`${s}`} alt="" fill sizes="120px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
