import type { AdminViewServerProps } from 'payload';
/**
 * Admin view that embeds the Umami shared dashboard in an iframe.
 * Registered automatically at `/admin/analytics` by the plugin.
 *
 * The view reads:
 * - `config.custom.umamiUrl` — set by the plugin factory from UMAMI_URL env var
 * - `tenant.analytics.umamiShareToken` — set per-tenant by super-admin in Tenants collection
 */
export default function AnalyticsView({ initPageResult, params, searchParams, }: AdminViewServerProps): Promise<import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=index.d.ts.map