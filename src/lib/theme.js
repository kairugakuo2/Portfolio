// Standalone theme store.
//
// Astro renders each interactive island as its own React root, so a React
// context provider cannot span them. This module holds the theme outside React
// and lets any island subscribe, which keeps the toggle, the palette, and the
// footer in sync without a shared tree.

const STORAGE_KEY = "portfolio-theme-v2";
const listeners = new Set();

export function getTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private browsing) - theme still applies for this session
  }
  listeners.forEach((listener) => listener(theme));
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light");
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
