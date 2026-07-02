// Small display helpers.

// Converts Western digits (0-9) in a value to Arabic-Indic numerals (٠-٩) so
// numbers read naturally on an Arabic-first page. e.g. toArabicDigits(3) → "٣".
export function toArabicDigits(value) {
  const map = "٠١٢٣٤٥٦٧٨٩";
  return String(value).replace(/[0-9]/g, (d) => map[Number(d)]);
}
