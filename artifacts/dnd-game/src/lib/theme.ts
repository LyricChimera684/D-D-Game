export type ThemeId = "dark-fantasy" | "arcane" | "crimson" | "forest";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  tagline: string;
  swatch: [string, string];
};

export const THEMES: ThemeMeta[] = [
  {
    id: "dark-fantasy",
    label: "Dark Fantasy",
    tagline: "Gold & blood — the original",
    swatch: ["#D4AF37", "#7a0d0d"],
  },
  {
    id: "arcane",
    label: "Arcane Neon",
    tagline: "Violet glow & cyan magic",
    swatch: ["#a855f7", "#06b6d4"],
  },
  {
    id: "crimson",
    label: "Iron & Crimson",
    tagline: "Black steel, red blood",
    swatch: ["#cc0000", "#1a1a1a"],
  },
  {
    id: "forest",
    label: "Moonlit Forest",
    tagline: "Silver-green druidcraft",
    swatch: ["#6ee88a", "#2d7a45"],
  },
];

const STORAGE_KEY = "ror:theme";
const VALID = new Set<ThemeId>(THEMES.map((t) => t.id));
const listeners = new Set<(t: ThemeId) => void>();

function readStored(): ThemeId {
  if (typeof window === "undefined") return "dark-fantasy";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw && VALID.has(raw as ThemeId) ? (raw as ThemeId) : "dark-fantasy";
}

function applyTheme(t: ThemeId, withTransition = false) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (withTransition) {
    root.classList.add("theme-changing");
    window.setTimeout(() => root.classList.remove("theme-changing"), 450);
  }

  if (t === "dark-fantasy") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", t);
  }
}

export function getTheme(): ThemeId {
  return readStored();
}

export function setTheme(t: ThemeId) {
  if (!VALID.has(t)) return;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, t);
  }
  applyTheme(t, true);
  listeners.forEach((fn) => fn(t));
}

export function subscribeTheme(fn: (t: ThemeId) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function initTheme() {
  applyTheme(readStored());
}
