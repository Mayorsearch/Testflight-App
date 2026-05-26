/**
 * iMediaSave Config — Central Export
 *
 * Import config primitives from this single barrel:
 *   import { env, isDev, isProd } from '@config';
 */

export {env, isDev, isStaging, isProd} from './env';
export type {AppEnv, AppConfig} from './env';
