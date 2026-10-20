"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Check } from "lucide-react";

const KEY = "amlak:favorites";
const listeners = new Set<() => void>();
let cache: string[] | null = null;
const EMPTY: string[] = [];

function read(): string[] {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { cache = []; }
  return cache!;
}
function write(next: string[]) {
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  listeners.forEach((l) => l());
}
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; cb(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
};

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toast = useToast();
  const toggle = useCallback((id: string) => {
    const cur = read();
    const on = cur.includes(id);
    write(on ? cur.filter((x) => x !== id) : [...cur, id]);
    toast(on ? "از ذخیره‌شده‌ها حذف شد" : "به ذخیره‌شده‌ها اضافه شد");
  }, [toast]);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

const ToastCtx = createContext<(m: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function Providers({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback((m: string) => {
    setMsg(m); clearTimeout(t.current);
    t.current = setTimeout(() => setMsg(""), 2800);
  }, []);
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
        {msg && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-bg shadow-lg">
            <Check size={16} aria-hidden /> {msg}
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}
