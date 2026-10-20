import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, isLang } from "@/i18n/config";

// Send any path without a locale prefix to the Persian version (/ -> /fa, /listings -> /fa/listings)
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLang(first)) return;
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLang}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|icon.svg|favicon.ico|.*\\..*).*)"] };
