/**
 * iMediaSave Environment Configuration
 *
 * Reads runtime config from react-native-config (backed by .env.* files).
 * Validates required keys at startup and throws clearly if any are missing.
 *
 * Usage:
 *   import { env } from '@config';
 *   fetch(`${env.API_BASE_URL}/endpoint`);
 */

import Config from 'react-native-config';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppEnv = 'dev' | 'staging' | 'prod';

export interface AppConfig {
  APP_ENV: AppEnv;
  APP_NAME: string;
  APP_BUNDLE_ID: string;
  APP_VERSION_NAME: string;
  API_BASE_URL: string;
  API_TIMEOUT_MS: number;
  FEATURE_ANALYTICS: boolean;
  FEATURE_CRASHLYTICS: boolean;
  FEATURE_PUSH_NOTIFICATIONS: boolean;
  SENTRY_DSN: string | undefined;
  FIREBASE_PROJECT_ID: string | undefined;
}

// ─── Required keys — app will throw at startup if missing ────────────────────

const REQUIRED_KEYS = ['APP_ENV', 'APP_NAME', 'API_BASE_URL'] as const;

// ─── Validation ──────────────────────────────────────────────────────────────

function assertEnv(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `[Config] Missing required environment variable: ${key}.\n` +
        `Copy the appropriate .env.*.example file to .env.* and fill in the value.`,
    );
  }
  return value;
}

function boolEnv(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value === '1' || value.toLowerCase() === 'true';
}

function numEnv(value: string | undefined, defaultValue: number): number {
  const n = Number(value);
  return isNaN(n) ? defaultValue : n;
}

// ─── Validate all required keys upfront ──────────────────────────────────────

REQUIRED_KEYS.forEach(key => assertEnv(key, Config[key]));

// ─── Export typed config object ───────────────────────────────────────────────

export const env: AppConfig = {
  APP_ENV: assertEnv('APP_ENV', Config.APP_ENV) as AppEnv,
  APP_NAME: assertEnv('APP_NAME', Config.APP_NAME),
  APP_BUNDLE_ID: Config.APP_BUNDLE_ID ?? 'com.imediasave.app',
  APP_VERSION_NAME: Config.APP_VERSION_NAME ?? '1.0.0',
  API_BASE_URL: assertEnv('API_BASE_URL', Config.API_BASE_URL),
  API_TIMEOUT_MS: numEnv(Config.API_TIMEOUT_MS, 30000),
  FEATURE_ANALYTICS: boolEnv(Config.FEATURE_ANALYTICS),
  FEATURE_CRASHLYTICS: boolEnv(Config.FEATURE_CRASHLYTICS),
  FEATURE_PUSH_NOTIFICATIONS: boolEnv(Config.FEATURE_PUSH_NOTIFICATIONS, true),
  SENTRY_DSN: Config.SENTRY_DSN || undefined,
  FIREBASE_PROJECT_ID: Config.FIREBASE_PROJECT_ID || undefined,
};

/** Convenience helpers */
export const isDev = env.APP_ENV === 'dev';
export const isStaging = env.APP_ENV === 'staging';
export const isProd = env.APP_ENV === 'prod';
