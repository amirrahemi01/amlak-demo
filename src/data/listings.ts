import type { L, Lang } from "@/i18n/config";

export type Deal = "sale" | "rent";
export type PType = "apartment" | "villa" | "house" | "commercial";

export const TYPES: Record<PType, L> = {
  apartment: { fa: "آپارتمان", en: "Apartment" },
  villa: { fa: "ویلا", en: "Villa" },
  house: { fa: "خانه ویلایی", en: "House" },
  commercial: { fa: "تجاری و اداری", en: "Commercial" },
};

type City = L & { hoods: Record<string, L> };
export const CITIES: Record<string, City> = {
  tehran: { fa: "تهران", en: "Tehran", hoods: {
    zafaranieh: { fa: "زعفرانیه", en: "Zafaranieh" }, niavaran: { fa: "نیاوران", en: "Niavaran" }, saadatabad: { fa: "سعادت‌آباد", en: "Saadat Abad" },
    shahrakgharb: { fa: "شهرک غرب", en: "Shahrak-e Gharb" }, vanak: { fa: "ونک", en: "Vanak" }, punak: { fa: "پونک", en: "Punak" },
    jordan: { fa: "جردن", en: "Jordan" }, tehranpars: { fa: "تهرانپارس", en: "Tehranpars" } } },
  isfahan: { fa: "اصفهان", en: "Isfahan", hoods: { chaharbagh: { fa: "چهارباغ بالا", en: "Upper Chaharbagh" }, jolfa: { fa: "جلفا", en: "Jolfa" }, mardavij: { fa: "مرداویج", en: "Mardavij" } } },
  shiraz: { fa: "شیراز", en: "Shiraz", hoods: { maaliabad: { fa: "معالی‌آباد", en: "Maali Abad" }, ghasrdasht: { fa: "قصردشت", en: "Ghasrodasht" }, sattarkhan: { fa: "ستارخان", en: "Sattarkhan" } } },
  mashhad: { fa: "مشهد", en: "Mashhad", hoods: { vakilabad: { fa: "وکیل‌آباد", en: "Vakil Abad" }, sajjad: { fa: "سجاد", en: "Sajjad" }, hashemieh: { fa: "هاشمیه", en: "Hashemieh" } } },
  tabriz: { fa: "تبریز", en: "Tabriz", hoods: { valiasr: { fa: "ولیعصر", en: "Valiasr" }, elgoli: { fa: "ائل‌گلی", en: "El Goli" } } },
  karaj: { fa: "کرج", en: "Karaj", hoods: { gohardasht: { fa: "گوهردشت", en: "Gohardasht" }, mehrshahr: { fa: "مهرشهر", en: "Mehrshahr" } } },
  rasht: { fa: "رشت", en: "Rasht", hoods: { golsar: { fa: "گلسار", en: "Golsar" }, moallem: { fa: "معلم", en: "Moallem" } } },
  nowshahr: { fa: "نوشهر", en: "Nowshahr", hoods: { sorkhrud: { fa: "سرخرود", en: "Sorkhrud" } } },
  kish: { fa: "کیش", en: "Kish", hoods: { sadaf: { fa: "شهرک صدف", en: "Sadaf Town" } } },
};

const P = (id: string) => `https://images.unsplash.com/photo-${id}`;
const EXT = {
  villa: ["1564013799919-ab600027ffc6", "1512917774080-9991f1c4c750", "1600596542815-ffad4c1539a9", "1613490493576-7fde63acd811", "1580587771525-78b9dba3b914", "1582268611958-ebfd161ef9cf", "1599809275671-b5942cabc7a2", "1600585154340-be6161a56a0c"],
  house: ["1570129477492-45c003edd2be", "1583608205776-bfd35f0d9f83", "1598228723793-52759bba239c", "1572120360610-d971b9d7767c", "1600566753190-17f0baa2a6c3", "1523217582562-09d0def993a6"],
  apartment: ["1545324418-cc1a3fa10c00", "1600607687939-ce8a6c25118c", "1565182999561-18d7dc61c393", "1560448204-e02f11c3d0e2", "1536376072261-38c75010e6c9", "1493809842364-78817add7ffb", "1615529328331-f8917597711f"],
  commercial: ["1545324418-cc1a3fa10c00", "1536376072261-38c75010e6c9"],
};
const INT = ["1560448204-e02f11c3d0e2", "1502672260266-1c1ef2d93688", "1493809842364-78817add7ffb", "1522708323590-d24dbb6b0267", "1560185007-cde436f6a4d0", "1484154218962-a197022b5858", "1556912172-45b7abe8b7e1", "1600607687939-ce8a6c25118c", "1565182999561-18d7dc61c393", "1554995207-c18c203602cb", "1536376072261-38c75010e6c9", "1615529328331-f8917597711f"];

export const FEATURES: Record<string, L> = {
  elevator: { fa: "آسانسور", en: "Elevator" }, parking: { fa: "پارکینگ", en: "Parking" }, storage: { fa: "انباری", en: "Storage room" },
  balcony: { fa: "بالکن", en: "Balcony" }, floorheat: { fa: "سیستم گرمایش از کف", en: "Underfloor heating" }, cabinets: { fa: "کابینت ام‌دی‌اف", en: "MDF kitchen cabinets" },
  master: { fa: "سرویس مستر", en: "En-suite bathroom" }, light: { fa: "نورگیر", en: "Lots of natural light" }, lobby: { fa: "لابی", en: "Lobby" },
  pool: { fa: "استخر", en: "Swimming pool" }, sauna: { fa: "سونا و جکوزی", en: "Sauna & jacuzzi" }, yard: { fa: "حیاط", en: "Yard" },
  intercom: { fa: "آیفون تصویری", en: "Video intercom" }, door: { fa: "درب ضدسرقت", en: "Security door" }, smart: { fa: "سیستم هوشمند", en: "Smart home system" },
  roof: { fa: "روف‌گاردن", en: "Roof garden" }, guard: { fa: "نگهبانی ۲۴ ساعته", en: "24/7 security" }, gym: { fa: "سالن ورزش", en: "Gym" },
};
const FEATURE_KEYS = Object.keys(FEATURES);

/** [floor, total floors]; floor 0 = ground floor, total 0 = unknown */
export type Floor = [number, number];

export type Listing = {
  id: string; title: L; deal: Deal; type: PType; city: string; hood: string;
  price: number; rent?: number; area: number; rooms: number; baths: number; parking: number;
  floor?: Floor; year: number; features: string[]; desc: L; images: string[];
  agent: number; featured: boolean; daysAgo: number;
};

// deal, type, city, hood, area, rooms, price|deposit (million toman), rent (million/month), year (Persian calendar), floor, title fa, title en
type Seed = [Deal, PType, string, string, number, number, number, number, number, Floor | null, string, string];
const seeds: Seed[] = [
  ["sale", "apartment", "tehran", "zafaranieh", 210, 3, 68000, 0, 1402, [7, 9], "پنت‌هاوس نورگیر با تراس بزرگ", "Bright penthouse with a large terrace"],
  ["sale", "apartment", "tehran", "niavaran", 165, 3, 42000, 0, 1400, [4, 6], "واحد نوساز مشرف به کوه", "New-build flat with mountain views"],
  ["sale", "apartment", "tehran", "saadatabad", 128, 2, 21500, 0, 1399, [5, 8], "آپارتمان دوخوابه نزدیک میدان کاج", "Two-bedroom flat near Kaj Square"],
  ["sale", "apartment", "tehran", "shahrakgharb", 142, 3, 25800, 0, 1398, [3, 7], "برج باغ با امکانات کامل", "Garden tower with full amenities"],
  ["sale", "apartment", "tehran", "vanak", 96, 2, 14900, 0, 1396, [6, 10], "آپارتمان بازسازی‌شده نزدیک پارک ملت", "Renovated flat near Mellat Park"],
  ["sale", "apartment", "tehran", "punak", 88, 2, 8900, 0, 1397, [2, 5], "واحد کم‌تردد در مجتمع آرام", "Quiet unit in a calm complex"],
  ["sale", "apartment", "tehran", "tehranpars", 74, 2, 5200, 0, 1394, [3, 4], "آپارتمان اقتصادی نزدیک مترو", "Affordable flat close to the metro"],
  ["sale", "apartment", "tehran", "jordan", 185, 3, 38500, 0, 1401, [8, 12], "طبقه بالا با ویوی باز", "High floor with open views"],
  ["sale", "apartment", "isfahan", "chaharbagh", 135, 3, 8400, 0, 1399, [4, 5], "آپارتمان لوکس رو به زاینده‌رود", "Luxury flat facing the Zayandeh River"],
  ["sale", "apartment", "shiraz", "maaliabad", 150, 3, 9800, 0, 1400, [3, 6], "واحد شیک با تراس رو به کوه", "Stylish flat with a mountain-facing terrace"],
  ["sale", "apartment", "mashhad", "vakilabad", 112, 2, 5600, 0, 1398, [5, 8], "آپارتمان نزدیک بلوار وکیل‌آباد", "Flat near Vakil Abad Boulevard"],
  ["sale", "apartment", "tabriz", "valiasr", 120, 3, 4900, 0, 1397, [2, 4], "آپارتمان تمیز و آماده سکونت", "Clean, move-in-ready flat"],
  ["sale", "apartment", "karaj", "gohardasht", 105, 2, 4300, 0, 1399, [4, 7], "واحد نوساز با پارکینگ اختصاصی", "New-build unit with private parking"],
  ["sale", "villa", "tehran", "zafaranieh", 620, 5, 185000, 0, 1401, null, "ویلای دوبلکس با استخر سرپوشیده", "Duplex villa with an indoor pool"],
  ["sale", "villa", "nowshahr", "sorkhrud", 480, 4, 24500, 0, 1399, null, "ویلای ساحلی با باغ و آلاچیق", "Seaside villa with garden and gazebo"],
  ["sale", "villa", "kish", "sadaf", 390, 4, 31000, 0, 1400, null, "ویلای مدرن نزدیک ساحل", "Modern villa close to the beach"],
  ["sale", "villa", "shiraz", "ghasrdasht", 520, 5, 29500, 0, 1398, null, "ویلای باغ‌دار با نمای سنگی", "Stone-faced villa with a garden"],
  ["sale", "villa", "rasht", "golsar", 350, 4, 14800, 0, 1397, null, "ویلای دوخوابه در محیط سرسبز", "Villa in green surroundings"],
  ["sale", "house", "isfahan", "jolfa", 260, 4, 18700, 0, 1395, null, "خانه ویلایی در بافت تاریخی", "House in the historic quarter"],
  ["sale", "house", "mashhad", "sajjad", 300, 4, 17200, 0, 1396, null, "خانه دوطبقه با حیاط بزرگ", "Two-storey house with a big yard"],
  ["sale", "house", "karaj", "mehrshahr", 220, 3, 11400, 0, 1398, null, "خانه نوساز با حیاط مرغوب", "New-build house with a lovely yard"],
  ["sale", "house", "tehran", "punak", 280, 4, 52000, 0, 1399, null, "ویلایی مدرن با حیاط خلوت", "Modern house with a private courtyard"],
  ["sale", "commercial", "tehran", "vanak", 90, 2, 27000, 0, 1397, [4, 0], "دفتر کار آماده در ساختمان اداری", "Ready-to-use office in a business tower"],
  ["sale", "commercial", "tabriz", "elgoli", 60, 1, 9600, 0, 1395, [0, 0], "مغازه پرتردد مشرف به خیابان اصلی", "Busy shop on the main street"],
  ["rent", "apartment", "tehran", "saadatabad", 105, 2, 1200, 28, 1400, [6, 8], "واحد دوخوابه نوساز", "New two-bedroom unit"],
  ["rent", "apartment", "tehran", "shahrakgharb", 120, 2, 1800, 40, 1399, [4, 6], "آپارتمان شیک با پارکینگ", "Stylish flat with parking"],
  ["rent", "apartment", "tehran", "punak", 85, 2, 600, 18, 1398, [3, 5], "آپارتمان تمیز نزدیک مترو", "Clean flat near the metro"],
  ["rent", "apartment", "tehran", "niavaran", 150, 3, 3000, 70, 1401, [5, 7], "واحد لوکس مشرف به شمیران", "Luxury unit overlooking Shemiran"],
  ["rent", "apartment", "isfahan", "mardavij", 98, 2, 450, 11, 1398, [2, 4], "آپارتمان دوخوابه ساکت", "Quiet two-bedroom flat"],
  ["rent", "apartment", "shiraz", "sattarkhan", 90, 2, 380, 9, 1397, [3, 4], "واحد روشن با ویوی آزاد", "Bright unit with an open view"],
  ["rent", "apartment", "mashhad", "hashemieh", 80, 2, 350, 8, 1396, [1, 5], "آپارتمان نزدیک مترو", "Flat close to the metro"],
  ["rent", "apartment", "rasht", "moallem", 100, 2, 300, 7, 1399, [2, 3], "واحد نوساز با نورگیر عالی", "New-build unit with great light"],
  ["rent", "villa", "nowshahr", "sorkhrud", 420, 4, 800, 95, 1399, null, "ویلای سه‌خوابه برای اجاره بلندمدت", "Three-bedroom villa for long-term rent"],
  ["rent", "villa", "kish", "sadaf", 300, 3, 600, 80, 1400, null, "ویلای مبله نزدیک ساحل", "Furnished villa near the beach"],
  ["rent", "house", "karaj", "gohardasht", 180, 3, 900, 22, 1397, null, "ویلایی دوطبقه با حیاط", "Two-storey house with a yard"],
  ["rent", "commercial", "tehran", "tehranpars", 70, 2, 700, 25, 1396, [3, 0], "دفتر کار نزدیک مترو", "Office near the metro"],
  ["rent", "commercial", "mashhad", "vakilabad", 55, 1, 500, 20, 1398, [0, 0], "مغازه با ویترین رو به خیابان", "Shop with a street-facing window"],
];

const DESCS: L[] = [
  { fa: "این ملک با نور طبیعی عالی، چیدمان کاربردی و دسترسی آسان به مراکز خرید و حمل‌ونقل عمومی، گزینه‌ای مطمئن برای سکونت راحت و سرمایه‌گذاری ایمن است.",
    en: "Great natural light, a practical layout and easy access to shops and public transport make this a safe choice to live in or invest in." },
  { fa: "مصالح درجه یک، نمای مرتب و محیط آرام باعث شده این ملک از نمونه‌های مشابه منطقه متمایز باشد. اسناد کامل و آماده انتقال است.",
    en: "Quality materials, a neat facade and a calm setting set this property apart from others in the area. Title documents are complete and ready for transfer." },
  { fa: "فضای باز و خانوادگی، آشپزخانه مجهز و اتاق‌های نورگیر؛ همه چیز برای یک زندگی راحت فراهم است. برای بازدید هماهنگ بفرمایید.",
    en: "Open family-friendly space, a fully equipped kitchen and bright rooms: everything is ready for comfortable living. Get in touch to book a viewing." },
];

const rot = <T,>(a: T[], i: number, n: number) => Array.from({ length: n }, (_, k) => a[(i + k * 3) % a.length]);

function pickAgent(type: PType, deal: Deal, city: string, hood: string) {
  if (type === "commercial") return 5;
  if (["nowshahr", "rasht", "kish"].includes(city)) return 3;
  if (["isfahan", "shiraz"].includes(city)) return 4;
  if (["zafaranieh", "niavaran", "jordan"].includes(hood) || type !== "apartment") return 0;
  return deal === "rent" ? 2 : city === "tehran" ? 1 : 5;
}

export const listings: Listing[] = seeds.map((s, i) => {
  const [deal, type, city, hood, area, rooms, price, rent, year, floor, fa, en] = s;
  const n = EXT[type].length;
  const cover = EXT[type][(i + Math.floor(i / n)) % n];
  const imgs = [cover, ...rot(INT, i, 6).filter((x) => x !== cover).slice(0, 4)];
  return {
    id: String(1001 + i),
    title: { fa, en },
    deal, type, city, hood,
    price: price * 1e6,
    rent: rent ? rent * 1e6 : undefined,
    area, rooms,
    baths: type === "commercial" ? 1 : Math.max(1, Math.min(rooms, 4)),
    parking: type === "commercial" ? 0 : rooms >= 3 || type !== "apartment" ? 2 : 1,
    floor: floor ?? undefined,
    year,
    features: rot(FEATURE_KEYS, i * 2, type === "villa" ? 9 : 7).filter((f, k, a) => a.indexOf(f) === k && (type === "villa" || f !== "pool")),
    desc: DESCS[i % 3],
    images: imgs.map(P),
    agent: pickAgent(type, deal, city, hood),
    featured: [0, 1, 13, 14, 8, 15, 24, 26].includes(i),
    daysAgo: (i * 7) % 29 + 1,
  };
});

export const getListing = (id: string) => listings.find((l) => l.id === id);

/** "تهران، زعفرانیه" / "Zafaranieh, Tehran" */
export function placeName(l: Listing, lang: Lang) {
  const city = CITIES[l.city][lang], hood = CITIES[l.city].hoods[l.hood][lang];
  return lang === "fa" ? `${city}، ${hood}` : `${hood}, ${city}`;
}
