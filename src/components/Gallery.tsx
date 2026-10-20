"use client";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Thumbs } from "swiper/modules";
import type { Swiper as SwiperT } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/providers";
import { dirOf } from "@/i18n/config";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const { t, d, lang } = useI18n();
  const dir = dirOf(lang);
  const [main, setMain] = useState<SwiperT | null>(null);
  const [thumbs, setThumbs] = useState<SwiperT | null>(null);
  const [i, setI] = useState(0);
  const arrow = "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/95 text-ink shadow transition hover:text-accent";
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-surface2">
        <Swiper
          key={dir}
          dir={dir}
          modules={[Thumbs, Keyboard, A11y]}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          keyboard={{ enabled: true }}
          loop
          spaceBetween={0}
          onSwiper={setMain}
          onSlideChange={(s) => setI(s.realIndex)}
          a11y={{ prevSlideMessage: t.detail.prev, nextSlideMessage: t.detail.next }}
          className="aspect-[4/3] sm:aspect-[16/10]"
        >
          {images.map((src, k) => (
            <SwiperSlide key={src}>
              <Image src={src} alt={`${alt} — ${t.detail.image(d(k + 1))}`} fill priority={k === 0} sizes="(min-width:1024px) 60vw, 100vw" className="select-none object-cover" draggable={false} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* "next" sits at the inline end and points along the reading direction */}
        <button type="button" onClick={() => main?.slidePrev()} aria-label={t.detail.prev} className={`${arrow} start-3`}><ChevronLeft size={22} aria-hidden className="rtl:-scale-x-100" /></button>
        <button type="button" onClick={() => main?.slideNext()} aria-label={t.detail.next} className={`${arrow} end-3`}><ChevronRight size={22} aria-hidden className="rtl:-scale-x-100" /></button>
        <span className="pill absolute bottom-3 start-3 z-10 bg-ink/85 text-bg" aria-live="polite">{d(i + 1)} / {d(images.length)}</span>
      </div>
      <Swiper
        key={`t-${dir}`}
        dir={dir}
        modules={[Thumbs]}
        onSwiper={setThumbs}
        watchSlidesProgress
        slidesPerView={4.3}
        spaceBetween={8}
        breakpoints={{ 640: { slidesPerView: 5, spaceBetween: 10 } }}
        className="mt-3"
      >
        {images.map((src, k) => (
          <SwiperSlide key={src} className="group cursor-pointer">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${k === i ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <Image src={src} alt={t.detail.showImage(d(k + 1))} fill sizes="140px" className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
