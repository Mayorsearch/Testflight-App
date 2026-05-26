/**
 * iMediaSave Color Tokens
 *
 * Brand palette sourced from https://www.imediasave.com
 *
 * HOW TO UPDATE:
 *   1. Open https://www.imediasave.com in a browser.
 *   2. Use DevTools → Inspector to capture the exact hex values used for:
 *      - Primary header/navigation background
 *      - CTA / accent button color
 *      - Body background and card surfaces
 *      - Primary text and secondary/muted text
 *   3. Replace the placeholder values below with the exact hex codes.
 *   4. Commit the update under a message like "theme: update iMediaSave brand tokens".
 *
 * CURRENT STATUS: These are scaffolded placeholders that approximate the
 * iMediaSave visual identity (deep blue primary, orange accent, clean white backgrounds).
 * Replace with exact values once confirmed with the design/brand team.
 */

export const colors = {
  // ─── Primary Brand ─────────────────────────────────────────────────────────
  /** Main brand color — used for headers, primary buttons, navigation bars.
   *  PLACEHOLDER — confirm exact value from imediasave.com */
  primary: '#0A2463',

  /** Lighter tint of primary — used for hover states, backgrounds, badges.
   *  PLACEHOLDER */
  primaryLight: '#3E6BF5',

  /** Darkened primary — pressed states, active tab indicators.
   *  PLACEHOLDER */
  primaryDark: '#051540',

  // ─── Accent / CTA ──────────────────────────────────────────────────────────
  /** Accent / call-to-action color — buttons, links, highlights.
   *  PLACEHOLDER — confirm exact value from imediasave.com */
  accent: '#FB8C00',

  /** Light accent — backgrounds behind accent elements, pill badges.
   *  PLACEHOLDER */
  accentLight: '#FFF3E0',

  // ─── Neutrals ──────────────────────────────────────────────────────────────
  white: '#FFFFFF',
  black: '#000000',

  /** Page / screen background */
  background: '#F5F7FA',

  /** Card / elevated surface background */
  surface: '#FFFFFF',

  /** Subtle divider / border */
  border: '#E0E4ED',

  // ─── Text ──────────────────────────────────────────────────────────────────
  /** Primary body text */
  textPrimary: '#1A1A2E',

  /** Secondary / muted text — captions, placeholders */
  textSecondary: '#5A6174',

  /** Disabled text */
  textDisabled: '#ABAFC0',

  /** Text on primary-colored backgrounds */
  textOnPrimary: '#FFFFFF',

  // ─── Semantic ──────────────────────────────────────────────────────────────
  success: '#2E7D32',
  successLight: '#E8F5E9',

  warning: '#F57F17',
  warningLight: '#FFFDE7',

  error: '#C62828',
  errorLight: '#FFEBEE',

  info: '#0288D1',
  infoLight: '#E1F5FE',
} as const;

export type ColorToken = keyof typeof colors;
