import { DefaultTemplate } from '@payloadcms/next/templates'
import { RenderTitle } from '@payloadcms/ui'
import type { AdminViewServerProps } from 'payload'

/**
 * Admin view that embeds the Umami shared dashboard in an iframe.
 * Registered automatically at `/admin/analytics` by the plugin.
 *
 * The view reads:
 * - `config.custom.umamiUrl` — set by the plugin factory from UMAMI_URL env var
 * - `tenant.analytics.umamiShareToken` — set per-tenant by super-admin in Tenants collection
 */
export default async function AnalyticsView({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  const resolvedParams = await Promise.resolve(params)
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const payload = initPageResult.req.payload

  // Umami URL stored by the plugin factory in config.custom
  const umamiUrl = (payload.config.custom?.umamiUrl as string | undefined) ?? ''

  // Resolve tenant ID from the authenticated user's tenant memberships
  const userTenants = initPageResult.req.user?.tenants
  const firstTenant = userTenants?.[0]?.tenant
  const tenantId = typeof firstTenant === 'object' ? firstTenant?.id : firstTenant

  // Fetch tenant document to get analytics config (overrideAccess: true by default in local API)
  const tenant = tenantId
    ? await payload.findByID({ collection: 'tenants', id: tenantId })
    : null

  type TenantAnalytics = { umamiShareToken?: string; umamiWebsiteId?: string }
  const analytics = (tenant as Record<string, unknown> | null)?.analytics as
    | TenantAnalytics
    | undefined

  const shareToken = analytics?.umamiShareToken
  const iframeUrl = umamiUrl && shareToken ? `${umamiUrl}/share/${shareToken}` : null

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={resolvedParams}
      payload={payload}
      permissions={initPageResult.permissions}
      searchParams={resolvedSearchParams}
      user={initPageResult.req.user ?? undefined}
      visibleEntities={initPageResult.visibleEntities ?? { collections: [], globals: [] }}
    >
      <div className="gutter gutter--left gutter--right">
        <RenderTitle className="mb-8" title="Analytics" />
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Umami Analytics"
            style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '8px' }}
          />
        ) : (
          <p style={{ color: 'var(--theme-elevation-500)', marginTop: '1rem' }}>
            Analytics not configured. Ask your super-admin to set the Umami Share Token in the
            Tenants collection (Analytics section).
          </p>
        )}
      </div>
    </DefaultTemplate>
  )
}
