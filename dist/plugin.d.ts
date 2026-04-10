import type { Plugin } from 'payload';
import type { UmamiAnalyticsPluginConfig } from './types.js';
/**
 * Payload CMS plugin that adds per-tenant Umami Analytics support.
 *
 * What the plugin does automatically:
 * - Adds `analytics.umamiWebsiteId` and `analytics.umamiShareToken` fields
 *   to the Tenants collection (super-admin only)
 * - Registers a custom admin view at `/admin/analytics` (iframe dashboard)
 * - Stores `UMAMI_URL` in `config.custom` for use by RSC components
 *
 * What you wire manually in your project:
 * - Render `<UmamiScript>` in `layout.tsx` `<head>` for tracking script injection
 * - Add analytics nav link to your `BeforeNavLinksGroup` component
 * - Add translations for the nav link label
 *
 * @example
 * ```ts
 * // src/plugins/index.ts
 * import { umamiAnalyticsPlugin } from '@marsender/payload-plugin-umami-analytics'
 *
 * export const plugins = [
 *   umamiAnalyticsPlugin(),
 * ]
 * ```
 */
export declare function umamiAnalyticsPlugin(pluginConfig?: UmamiAnalyticsPluginConfig): Plugin;
//# sourceMappingURL=plugin.d.ts.map