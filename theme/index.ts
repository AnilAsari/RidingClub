export const themes = {
  dark: {
    colors: {
      background: "#0B1117",
      surface: "#101923",
      elevated: "#17212B",
      border: "#263442",
      text: "#F3F7FA",
      textMuted: "#9BA8B5",
      accent: "#F47632",
      accentSoft: "#2A1A13",
      tabInactive: "#788695",
    },
    statusBarStyle: "light" as const,
  },
  light: {
    colors: {
      background: "#F8F5EF",
      surface: "#FFFFFF",
      elevated: "#FFFFFF",
      border: "#E5DED4",
      text: "#17212B",
      textMuted: "#4D5965",
      accent: "#C25B2B",
      accentSoft: "#F3E5DA",
      tabInactive: "#6B7280",
    },
    statusBarStyle: "dark" as const,
  },
};

export type AppThemeName = keyof typeof themes;

export const activeThemeName: AppThemeName = "dark";
export const theme = themes[activeThemeName];

export const navigationTheme = {
  headerStyle: { backgroundColor: theme.colors.surface },
  headerTintColor: theme.colors.text,
  headerTitleStyle: { fontWeight: "800" as const },
  contentStyle: { backgroundColor: theme.colors.background },
};
