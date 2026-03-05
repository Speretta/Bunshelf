import type { Theme } from "../utils/types.js";

export const themes: Theme[] = [
  {
    name: "light",
    label: "Light",
    vars: {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f7f8fa",
      "--bg-tertiary": "#eef0f4",
      "--text-primary": "#1e293b",
      "--text-secondary": "#475569",
      "--text-muted": "#94a3b8",
      "--accent-primary": "#2563eb",
      "--accent-secondary": "#3b82f6",
      "--accent-hover": "#1d4ed8",
      "--border-color": "#e2e8f0",
      "--code-bg": "#f1f5f9",
      "--code-text": "#1e293b",
      "--link-color": "#2563eb",
      "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
      "--shadow-md": "0 4px 6px rgba(0, 0, 0, 0.07)",
    },
  },
  {
    name: "dark",
    label: "Dark",
    vars: {
      "--bg-primary": "#0f172a",
      "--bg-secondary": "#1e293b",
      "--bg-tertiary": "#334155",
      "--text-primary": "#f1f5f9",
      "--text-secondary": "#cbd5e1",
      "--text-muted": "#64748b",
      "--accent-primary": "#3b82f6",
      "--accent-secondary": "#60a5fa",
      "--accent-hover": "#2563eb",
      "--border-color": "#334155",
      "--code-bg": "#1e293b",
      "--code-text": "#e2e8f0",
      "--link-color": "#60a5fa",
      "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.3)",
      "--shadow-md": "0 4px 6px rgba(0, 0, 0, 0.4)",
    },
  },
  {
    name: "hacker",
    label: "Hacker",
    vars: {
      "--bg-primary": "#0a0a0a",
      "--bg-secondary": "#111111",
      "--bg-tertiary": "#1a1a1a",
      "--text-primary": "#00ff00",
      "--text-secondary": "#00cc00",
      "--text-muted": "#008800",
      "--accent-primary": "#00ff00",
      "--accent-secondary": "#00dd00",
      "--accent-hover": "#00ff41",
      "--border-color": "#003300",
      "--code-bg": "#000000",
      "--code-text": "#00ff00",
      "--link-color": "#00ff41",
      "--shadow-sm": "0 0 5px rgba(0, 255, 0, 0.1)",
      "--shadow-md": "0 0 10px rgba(0, 255, 0, 0.2)",
    },
  },
];

export function getTheme(name: string): Theme | undefined {
  return themes.find((t) => t.name === name);
}

export function getDefaultTheme(): Theme {
  return themes[0] ?? {
    name: "light",
    label: "Light",
    vars: {
      "--bg-primary": "#ffffff",
      "--text-primary": "#1e293b",
    },
  };
}
