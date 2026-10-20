"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type Opt = { value: string; label: string };

export default function Select({ label, value, onChange, options, disabled, compact, className = "" }: {
  label?: string; value: string; onChange: (v: string) => void; options: Opt[]; disabled?: boolean; compact?: boolean; className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const sel = options.findIndex((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const off = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [open]);

  const choose = (i: number) => { onChange(options[i].value); setOpen(false); };
  const key = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") return setOpen(false);
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      if (!open) { setHi(Math.max(sel, 0)); return setOpen(true); }
      setHi((h) => Math.min(options.length - 1, Math.max(0, h + (e.key === "ArrowDown" ? 1 : -1))));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open ? choose(hi) : (setHi(Math.max(sel, 0)), setOpen(true));
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      {label && <span id={`${id}-l`} className="mb-1 block text-xs text-muted">{label}</span>}
      <button type="button" disabled={disabled} role="combobox" aria-expanded={open} aria-haspopup="listbox" aria-controls={`${id}-b`} aria-labelledby={label ? `${id}-l` : undefined}
        onClick={() => { setHi(Math.max(sel, 0)); setOpen(!open); }} onKeyDown={key}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-surface px-3.5 text-start leading-none transition-colors disabled:opacity-50 ${compact ? "min-h-11 text-sm" : "min-h-12"} ${open ? "border-accent ring-[3px] ring-soft" : "border-line hover:border-muted"}`}>
        <span className="truncate pt-1">{options[sel]?.label ?? ""}</span>
        <ChevronDown size={17} aria-hidden className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul id={`${id}-b`} role="listbox" className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-64 overflow-auto rounded-xl border border-line bg-surface p-1 shadow-[0_14px_34px_-12px_rgba(0,0,0,.35)]">
          {options.map((o, i) => (
            <li key={o.value} role="option" aria-selected={i === sel} onPointerEnter={() => setHi(i)} onClick={() => choose(i)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-lg px-3 text-sm ${i === hi ? "bg-soft" : ""} ${i === sel ? "font-bold text-accent" : ""}`}>
              <span className="pt-1">{o.label}</span>{i === sel && <Check size={16} aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
