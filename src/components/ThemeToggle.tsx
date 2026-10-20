"use client";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb);
  o.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => o.disconnect();
};
const get = () => document.documentElement.dataset.theme === "dark";

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, get, () => false);
  const flip = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("amlak:theme", next); } catch {}
  };
  return (
    <button onClick={flip} aria-label={dark ? "تم روشن" : "تم تیره"} className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent">
      {dark ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
    </button>
  );
}
