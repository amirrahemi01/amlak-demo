import type { L } from "@/i18n/config";

export type Agent = { id: number; name: L; role: L; phone: string; areas: L; years: number; bio: L };
export const agents: Agent[] = [
  { id: 0, name: { fa: "مریم صادقی", en: "Maryam Sadeghi" }, role: { fa: "مدیر فروش املاک لوکس", en: "Luxury Sales Director" }, phone: "09121234567",
    areas: { fa: "زعفرانیه، نیاوران، جردن", en: "Zafaranieh, Niavaran, Jordan" }, years: 14,
    bio: { fa: "تخصص در خرید و فروش ملک‌های ویژه شمال تهران و مشاوره سرمایه‌گذاری.", en: "Specialist in premium homes in north Tehran and investment advice." } },
  { id: 1, name: { fa: "علی رضایی", en: "Ali Rezaei" }, role: { fa: "مشاور ارشد آپارتمان", en: "Senior Apartment Advisor" }, phone: "09122345678",
    areas: { fa: "سعادت‌آباد، شهرک غرب", en: "Saadat Abad, Shahrak-e Gharb" }, years: 11,
    bio: { fa: "راهنمای خریداران اولین‌بار؛ توضیح شفاف درباره اسناد و قیمت واقعی بازار.", en: "Guides first-time buyers with clear advice on paperwork and real market prices." } },
  { id: 2, name: { fa: "نازنین کاظمی", en: "Nazanin Kazemi" }, role: { fa: "مشاور رهن و اجاره", en: "Rentals Advisor" }, phone: "09193456789",
    areas: { fa: "پونک، ونک، تهرانپارس", en: "Punak, Vanak, Tehranpars" }, years: 8,
    bio: { fa: "پیدا کردن خانه مناسب اجاره‌ای با سریع‌ترین زمان و قرارداد شفاف.", en: "Finds the right rental fast, with a clear and fair contract." } },
  { id: 3, name: { fa: "حسین نوری", en: "Hossein Nouri" }, role: { fa: "مشاور ویلا و باغ", en: "Villa & Garden Advisor" }, phone: "09114567890",
    areas: { fa: "نوشهر، رشت، کیش", en: "Nowshahr, Rasht, Kish" }, years: 12,
    bio: { fa: "ویلاهای شمال و جزیره کیش، از خرید تا مدیریت اجاره.", en: "Northern and Kish Island villas, from purchase to rental management." } },
  { id: 4, name: { fa: "سارا احمدی", en: "Sara Ahmadi" }, role: { fa: "مشاور املاک شهرستان‌ها", en: "Regional Advisor" }, phone: "09135678901",
    areas: { fa: "اصفهان، شیراز", en: "Isfahan, Shiraz" }, years: 9,
    bio: { fa: "آشنا با بافت تاریخی و محله‌های نوساز دو شهر بزرگ مرکزی و جنوبی.", en: "Knows both the historic quarters and the new districts of Isfahan and Shiraz." } },
  { id: 5, name: { fa: "رضا مرادی", en: "Reza Moradi" }, role: { fa: "مشاور تجاری و اداری", en: "Commercial Advisor" }, phone: "09156789012",
    areas: { fa: "مشهد، تبریز، کرج", en: "Mashhad, Tabriz, Karaj" }, years: 10,
    bio: { fa: "دفتر کار، مغازه و املاک تجاری با تحلیل بازده سرمایه.", en: "Offices, shops and commercial property, with return-on-investment analysis." } },
];
