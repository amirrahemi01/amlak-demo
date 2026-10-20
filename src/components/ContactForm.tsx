"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { useI18n, useToast } from "@/lib/providers";

export default function ContactForm({ subject, compact = false, cta }: { subject?: string; compact?: boolean; cta?: string }) {
  const { t } = useI18n();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setTimeout(() => { setBusy(false); form.reset(); toast(t.toast.sent); }, 600);
  };
  return (
    <form onSubmit={submit} className="grid gap-3">
      <label><span className="mb-1 block text-sm">{t.form.name}</span><input required name="name" autoComplete="name" className="field" /></label>
      <label><span className="mb-1 block text-sm">{t.form.phone}</span><input required name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder={t.form.phonePh} className="field placeholder:text-muted/70 rtl:text-end" /></label>
      <label><span className="mb-1 block text-sm">{t.form.msg}</span><textarea required name="msg" rows={compact ? 3 : 5} defaultValue={subject} className="field py-3" /></label>
      <button disabled={busy} className="btn btn-primary ctl disabled:opacity-60"><Send size={17} aria-hidden className="rtl:-scale-x-100" />{busy ? t.form.sending : cta ?? t.form.send}</button>
    </form>
  );
}
