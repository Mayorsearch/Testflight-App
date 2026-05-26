/**
 * iMediaSave Typography Tokens
 *
 * Font families default to system fonts (SF Pro on iOS, Roboto on Android).
 * Replace `fontFamily` values with custom brand fonts once assets are added
 * to the project under `src/assets/fonts/`.
 */

import {Platform, TextStyle} from 'react-native';

/** Base font family — swap with brand font once assets are available */
const FONT_FAMILY_REGULAR = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

const FONT_FAMILY_MEDIUM = Platform.select({
  ios: 'System',
  android: 'Roboto-Medium',
  default: 'System',
});

const FONT_FAMILY_BOLD = Platform.select({
  ios: 'System',
  android: 'Roboto-Bold',
  default: 'System',
});

export const typography: Record<string, TextStyle> = {
  /** Display — hero text, splash screens */
  display: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  /** H1 — screen titles */
  h1: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  /** H2 — section titles */
  h2: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
  },

  /** H3 — card titles, sub-section headings */
  h3: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },

  /** Body — standard paragraph text */
  body: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },

  /** Body Small — secondary / supporting text */
  bodySmall: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },

  /** Caption — timestamps, labels, helper text */
  caption: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  /** Button label */
  button: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  /** Overline — ALL CAPS category labels */
  overline: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
};
