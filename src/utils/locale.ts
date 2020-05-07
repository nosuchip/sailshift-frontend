export function detectLocale (): { lang: string, country: string } {
  const locale = (navigator.languages && navigator.languages.length)
    ? navigator.languages[0]
    : (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || "en";

  const [lang, country] = locale.split(/[_-]/);

  return { lang, country };
}
