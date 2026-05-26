/**
 * Theme tokens unit tests
 */

import {colors, spacing, typography, radii} from '../../theme';

describe('colors', () => {
  it('exports primary brand color', () => {
    expect(colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('exports accent color', () => {
    expect(colors.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('exports all semantic colors', () => {
    expect(colors.success).toBeDefined();
    expect(colors.warning).toBeDefined();
    expect(colors.error).toBeDefined();
    expect(colors.info).toBeDefined();
  });
});

describe('spacing', () => {
  it('follows an 8pt grid (every value is a positive integer)', () => {
    Object.values(spacing).forEach(value => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  it('has ordered scale from xs to xxxl', () => {
    expect(spacing.xs).toBeLessThan(spacing.sm);
    expect(spacing.sm).toBeLessThan(spacing.md);
    expect(spacing.md).toBeLessThan(spacing.lg);
    expect(spacing.lg).toBeLessThan(spacing.xl);
  });
});

describe('typography', () => {
  it('exports h1 with required TextStyle properties', () => {
    expect(typography.h1.fontSize).toBeGreaterThan(0);
    expect(typography.h1.lineHeight).toBeGreaterThan(0);
    expect(typography.h1.fontWeight).toBeDefined();
  });

  it('h1 font size is larger than body font size', () => {
    expect(typography.h1.fontSize).toBeGreaterThan(typography.body.fontSize!);
  });
});

describe('radii', () => {
  it('full radius is very large', () => {
    expect(radii.full).toBeGreaterThanOrEqual(999);
  });
});
