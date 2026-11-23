"use client";
import { useSyncExternalStore } from "react";
import { LANG_KEY, type Lang } from "@/i18n/language";

function readLang(): Lang {
  try { return localStorage.getItem(LANG_KEY) === "fr" ? "fr" : "en"; } catch { return "en"; }
}

/** Shows the language you can switch to: "FR" on the English site, "EN" on the French one. */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const lang = useSyncExternalStore(() => () => {}, readLang, () => "en" as Lang);
  const next: Lang = lang === "fr" ? "en" : "fr";
  const switchLanguage = () => {
    try { localStorage.setItem(LANG_KEY, next); } catch { /* storage blocked */ }
    window.location.reload();
  };
  return (
    <button
      type="button" onClick={switchLanguage} lang={next}
      title={next === "fr" ? "Voir le site en français" : "View the site in English"}
      aria-label={next === "fr" ? "Voir le site en français" : "View the site in English"}
      translate="no"
      className={`rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold hover:bg-black hover:text-white ${className}`}
    >
      {next.toUpperCase()}
    </button>
  );
}
