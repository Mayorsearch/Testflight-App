/**
 * iMediaSave Spacing Tokens
 *
 * Based on an 8-pt grid system for consistent layout alignment.
 */

export const spacing = {
  /** 2px — micro gap, icon padding */
  xxs: 2,
  /** 4px — tight inline spacing */
  xs: 4,
  /** 8px — compact component padding */
  sm: 8,
  /** 12px — inline component spacing */
  md: 12,
  /** 16px — standard section padding */
  lg: 16,
  /** 24px — between major sections */
  xl: 24,
  /** 32px — screen-level vertical rhythm */
  xxl: 32,
  /** 48px — large layout gaps */
  xxxl: 48,
} as const;

export type SpacingToken = keyof typeof spacing;

/** Border radii */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/** Shadow / elevation presets */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
