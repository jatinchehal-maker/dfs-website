"use client";
import { useEffect } from "react";
import { FR, FR_PATTERNS } from "@/i18n/fr";
import { LANG_KEY } from "@/i18n/language";

const ATTRS = ["alt", "title", "placeholder", "aria-label"] as const;
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE"]);

function toFrench(text: string): string | null {
  const key = text.replace(/\s+/g, " ").trim();
  if (!key) return null;
  const direct = FR[key];
  if (direct !== undefined) return direct === key ? null : text.replace(key.trim(), direct);
  for (const [re, fn] of FR_PATTERNS) {
    const m = key.match(re);
    if (m) return fn(m);
  }
  return null;
}

function translateText(node: Text) {
  const next = toFrench(node.data);
  if (next !== null && next !== node.data) {
    const lead = node.data.match(/^\s*/)?.[0] ?? "";
    const trail = node.data.match(/\s*$/)?.[0] ?? "";
    const value = lead + next.trim() + trail;
    if (value !== node.data) node.data = value;
  }
}

function translateElement(el: Element) {
  for (const attr of ATTRS) {
    const value = el.getAttribute(attr);
    if (!value) continue;
    const next = toFrench(value);
    if (next !== null && next !== value) el.setAttribute(attr, next);
  }
}

function translateTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return translateText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (SKIP.has(el.tagName)) return;
  translateElement(el);
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) =>
      n.nodeType === Node.ELEMENT_NODE && SKIP.has((n as Element).tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === Node.TEXT_NODE) translateText(n as Text);
    else translateElement(n as Element);
  }
}

function translateTitle() {
  const next = toFrench(document.title);
  if (next && next !== document.title) document.title = next;
}

/** Translates the whole page to French when the visitor picked FR, including text React adds later. */
export default function Translator() {
  useEffect(() => {
    let french = false;
    try { french = localStorage.getItem(LANG_KEY) === "fr"; } catch { /* storage blocked: stay in English */ }
    const html = document.documentElement;
    if (!french) return;
    html.lang = "fr";
    translateTree(document.body);
    translateTitle();
    html.dataset.translated = "1";

    const observer = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "characterData") translateText(r.target as Text);
        else if (r.type === "attributes") translateElement(r.target as Element);
        else r.addedNodes.forEach(translateTree);
      }
      translateTitle();
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
