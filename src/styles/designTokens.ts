// Design tokens (industrial-standard scales)
// Use these values across components for consistent spacing, type, radii, and layout.

export const breakpoints = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

// Spacing scale (4px base)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

// Radii
export const radii = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  pill: 9999,
}

// Typography
export const fonts = {
  system: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  heading: `Sora, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
  ui: `Manrope, Inter, system-ui, -apple-system, 'Segoe UI', Roboto`,
}

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
}

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
}

// Layout sizes (max widths, container padding)
export const layout = {
  contentMaxWidth: 1200,
  containerPadding: spacing.md,
  sidebarWidth: 260,
}

// General sizes for components
export const sizes = {
  iconSm: 16,
  icon: 20,
  iconLg: 24,
}

export default {
  breakpoints,
  spacing,
  radii,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  layout,
  sizes,
}
