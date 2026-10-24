import { createContext, useContext, useState, type ReactNode } from "react";

export const LIGHT_COLORS = {
  primary: "#254D3D",
  primaryDark: "#253F33",
  primaryLight: "#EDF1D7",
  background: "#F7F7EF",
  surface: "#FCFCF5",
  surfaceMuted: "#E9EDDE",
  border: "#DEE2D4",
  borderMuted: "#D5DDC8",
  text: "#656F60",
  textSecondary: "#72766A",
  textMuted: "#7D8473",
  accent: "#6D8558",
  accentMuted: "#69775D",
  accentLight: "#92A35C",
  accentSurface: "#DBE6AD",
  accentBorder: "#C9D89A",
  textOnPrimary: "#F3F3DE",
  textOnPrimaryMuted: "#C9D5B8",
  artAccent: "#E8EECF",
  artTextMuted: "#6C785F",
  tomato: "tomato",
  white: "white",
} as const;

export const DARK_COLORS = {
  primary: "#A8C9AE",
  primaryDark: "#E0EBDD",
  primaryLight: "#253F33",
  background: "#171D19",
  surface: "#222B25",
  surfaceMuted: "#2D3930",
  border: "#3A493D",
  borderMuted: "#4A5C4C",
  text: "#D4DED3",
  textSecondary: "#B2C0B1",
  textMuted: "#94A394",
  accent: "#A3C17C",
  accentMuted: "#A8BD91",
  accentLight: "#C2D98E",
  accentSurface: "#39472E",
  accentBorder: "#536746",
  textOnPrimary: "#F3F3DE",
  textOnPrimaryMuted: "#C9D5B8",
  artAccent: "#E8EECF",
  artTextMuted: "#A8B69B",
  tomato: "tomato",
  white: "white",
} as const;

export type AppColors = {
  readonly [ColorName in keyof typeof LIGHT_COLORS]: string;
};
export type ThemeMode = "light" | "dark";

interface AppTheme {
  mode: ThemeMode;
  colors: AppColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<AppTheme | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const colors = mode === "light" ? LIGHT_COLORS : DARK_COLORS;
  const toggleTheme = () =>
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useAppTheme must be used within AppThemeProvider.");
  }

  return theme;
}
