/**
 * Checks if Umami analytics is configured for a specific tenant.
 * Requires both the UMAMI_URL env var and a umamiShareToken on the Tenant document.
 *
 * @param tenantId - The tenant's numeric ID (from cookie/header)
 * @param payload  - The Payload instance (injected by caller to avoid importing project config)
 */ export async function isAnalyticsEnabledForTenant(tenantId, payload) {
    if (!tenantId || !process.env.UMAMI_URL) return false;
    const tenant = await payload.findByID({
        collection: 'tenants',
        id: tenantId
    });
    const analytics = tenant?.analytics;
    return !!analytics?.umamiShareToken;
}

//# sourceMappingURL=utilities.js.map