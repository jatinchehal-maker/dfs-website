export type Lang = "en" | "fr";
export const LANG_KEY = "dfs-lang";

/** Runs before paint: hides the page while French is applied, so English never flashes. */
export const LANG_BOOT_SCRIPT = `(function(){try{if(localStorage.getItem("${LANG_KEY}")==="fr"){var h=document.documentElement;h.lang="fr";h.dataset.lang="fr";setTimeout(function(){h.dataset.translated="1"},1500)}}catch(e){}})();`;
