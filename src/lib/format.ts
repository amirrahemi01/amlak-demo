const FA = "۰۱۲۳۴۵۶۷۸۹";
export const fa = (n: number | string) => String(n).replace(/\d/g, (d) => FA[+d]);
export const num = (n: number) => fa(n.toLocaleString("en-US").replace(/,/g, "٬"));

/** Price in toman -> "۱۲٫۵ میلیارد تومان" */
export function price(toman: number) {
  if (toman >= 1e9) {
    const v = Math.round((toman / 1e9) * 100) / 100;
    return `${fa(String(v).replace(".", "٫"))} میلیارد تومان`;
  }
  const v = Math.round(toman / 1e6);
  return `${num(v)} میلیون تومان`;
}
