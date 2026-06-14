export interface Country {
  code: string;        // ISO-2
  nameAr: string;
  nameEn: string;
  dial: string;        // e.g. "+963"
  flag: string;        // emoji
}

export const COUNTRIES: Country[] = [
  { code: "SY", nameAr: "سوريا", nameEn: "Syria", dial: "+963", flag: "🇸🇾" },
  { code: "LB", nameAr: "لبنان", nameEn: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "JO", nameAr: "الأردن", nameEn: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "PS", nameAr: "فلسطين", nameEn: "Palestine", dial: "+970", flag: "🇵🇸" },
  { code: "IQ", nameAr: "العراق", nameEn: "Iraq", dial: "+964", flag: "🇮🇶" },
  { code: "TR", nameAr: "تركيا", nameEn: "Türkiye", dial: "+90", flag: "🇹🇷" },
  { code: "EG", nameAr: "مصر", nameEn: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "SA", nameAr: "السعودية", nameEn: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "AE", nameAr: "الإمارات", nameEn: "UAE", dial: "+971", flag: "🇦🇪" },
  { code: "QA", nameAr: "قطر", nameEn: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "KW", nameAr: "الكويت", nameEn: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "BH", nameAr: "البحرين", nameEn: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { code: "OM", nameAr: "عمان", nameEn: "Oman", dial: "+968", flag: "🇴🇲" },
  { code: "YE", nameAr: "اليمن", nameEn: "Yemen", dial: "+967", flag: "🇾🇪" },
  { code: "LY", nameAr: "ليبيا", nameEn: "Libya", dial: "+218", flag: "🇱🇾" },
  { code: "TN", nameAr: "تونس", nameEn: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { code: "DZ", nameAr: "الجزائر", nameEn: "Algeria", dial: "+213", flag: "🇩🇿" },
  { code: "MA", nameAr: "المغرب", nameEn: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "SD", nameAr: "السودان", nameEn: "Sudan", dial: "+249", flag: "🇸🇩" },
  { code: "US", nameAr: "الولايات المتحدة", nameEn: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "CA", nameAr: "كندا", nameEn: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "GB", nameAr: "بريطانيا", nameEn: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "DE", nameAr: "ألمانيا", nameEn: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", nameAr: "فرنسا", nameEn: "France", dial: "+33", flag: "🇫🇷" },
  { code: "SE", nameAr: "السويد", nameEn: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "NL", nameAr: "هولندا", nameEn: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "AU", nameAr: "أستراليا", nameEn: "Australia", dial: "+61", flag: "🇦🇺" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];