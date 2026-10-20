"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/lib/providers";

export default function ContactForm({ subject, compact = false, cta = "ارسال پیام" }: { subject?: string; compact?: boolean; cta?: string }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setTimeout(() => { setBusy(false); form.reset(); toast("پیام شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم"); }, 600);
  };
  return (
    <form onSubmit={submit} className="grid gap-3">
      <label><span className="mb-1 block text-sm">نام و نام خانوادگی</span><input required name="name" autoComplete="name" className="field" /></label>
      <label><span className="mb-1 block text-sm">شماره تماس</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" className="field text-end placeholder:text-muted/70" /></label>
      <label><span className="mb-1 block text-sm">پیام</span><textarea required name="msg" rows={compact ? 3 : 5} defaultValue={subject} className="field py-3" /></label>
      <button disabled={busy} className="btn btn-primary ctl disabled:opacity-60"><Send size={17} aria-hidden className="-scale-x-100" />{busy ? "در حال ارسال…" : cta}</button>
    </form>
  );
}
