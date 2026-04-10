import type { Payload } from 'payload'

/**
 * Checks if Umami analytics is configured for a specific tenant.
 * Requires both the UMAMI_URL env var and a umamiShareToken on the Tenant document.
 *
 * @param tenantId - The tenant's numeric ID (from cookie/header)
 * @param payload  - The Payload instance (injected by caller to avoid importing project config)
 */
export async function isAnalyticsEnabledForTenant(
  tenantId: number | null,
  payload: Payload,
): Promise<boolean> {
  if (!tenantId || !process.env.UMAMI_URL) return false

  const tenant = await payload.findByID({
    collection: 'tenants',
    id: tenantId,
  })

  const analytics = (tenant as Record<string, Record<string, unknown> | undefined>)?.analytics
  return !!analytics?.umamiShareToken
}
