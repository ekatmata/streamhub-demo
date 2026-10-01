// Shared design tokens for the StreamHub demo app.
// Mirrors the palette used in the companion web demo for a consistent brand.

export const colors = {
  background: "#0E1217",
  surface: "#171D26",
  surfaceRaised: "#1F2733",
  border: "#2A3340",
  textPrimary: "#F2F4F7",
  textSecondary: "#8D96A3",
  textTertiary: "#5E6773",
  accent: "#E7A33C",
  accentInk: "#1C1406",
  live: "#E2503A",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: "700" as const },
  heading: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 14, fontWeight: "400" as const },
  caption: { fontSize: 12, fontWeight: "500" as const },
};

// Gradient-style fallback "art" colors for content cards (no external image
// assets are bundled with this demo, by design).
export const artFills = [
  "#2B3A55",
  "#4A3826",
  "#2E4536",
  "#3C2A4A",
  "#4A2A2E",
  "#284150",
];
