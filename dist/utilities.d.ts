import type { Payload } from 'payload';
/**
 * Checks if Umami analytics is configured for a specific tenant.
 * Requires both the UMAMI_URL env var and a umamiShareToken on the Tenant document.
 *
 * @param tenantId - The tenant's numeric ID (from cookie/header)
 * @param payload  - The Payload instance (injected by caller to avoid importing project config)
 */
export declare function isAnalyticsEnabledForTenant(tenantId: number | null, payload: Payload): Promise<boolean>;
//# sourceMappingURL=utilities.d.ts.map