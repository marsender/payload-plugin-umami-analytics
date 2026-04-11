import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DefaultTemplate } from '@payloadcms/next/templates';
import { RenderTitle } from '@payloadcms/ui';
/**
 * Admin view that embeds the Umami shared dashboard in an iframe.
 * Registered automatically at `/admin/analytics` by the plugin.
 *
 * The view reads:
 * - `config.custom.umamiUrl` — set by the plugin factory from UMAMI_URL env var
 * - `tenant.analytics.umamiShareToken` — set per-tenant by super-admin in Tenants collection
 */ export default async function AnalyticsView({ initPageResult, params, searchParams }) {
    const resolvedParams = await Promise.resolve(params);
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const payload = initPageResult.req.payload;
    const t = initPageResult.req.i18n.t;
    // Umami URL stored by the plugin factory in config.custom
    const umamiUrl = payload.config.custom?.umamiUrl ?? '';
    // Resolve tenant ID: prefer the active tenant from the `payload-tenant` cookie
    // (set by middleware when a tenant is selected in the admin panel), so super-admins
    // who have no entries in their tenants array still see the correct tenant.
    const cookieHeader = initPageResult.req.headers.get('cookie') ?? '';
    const cookieTenantId = cookieHeader.split(';').map((c)=>c.trim().split('=')).find(([name])=>name === 'payload-tenant')?.[1];
    let tenantId = cookieTenantId ? Number(cookieTenantId) : undefined;
    // Fall back to the user's first tenant membership when no cookie is present
    if (!tenantId) {
        const userTenants = initPageResult.req.user?.tenants;
        const firstTenant = userTenants?.[0]?.tenant;
        tenantId = typeof firstTenant === 'object' ? firstTenant?.id : firstTenant;
    }
    // Fetch tenant document to get analytics config (overrideAccess: true by default in local API)
    const tenant = tenantId ? await payload.findByID({
        collection: 'tenants',
        id: tenantId
    }) : null;
    const analytics = tenant?.analytics;
    const shareToken = analytics?.umamiShareToken;
    const iframeUrl = umamiUrl && shareToken ? `${umamiUrl}/share/${shareToken}` : null;
    return /*#__PURE__*/ _jsx(DefaultTemplate, {
        i18n: initPageResult.req.i18n,
        locale: initPageResult.locale,
        params: resolvedParams,
        payload: payload,
        permissions: initPageResult.permissions,
        searchParams: resolvedSearchParams,
        user: initPageResult.req.user ?? undefined,
        visibleEntities: initPageResult.visibleEntities ?? {
            collections: [],
            globals: []
        },
        children: iframeUrl ? /*#__PURE__*/ _jsx("iframe", {
            src: iframeUrl,
            title: t('pluginUmami:analyticsTitle'),
            style: {
                width: '100%',
                height: '100vh',
                border: 'none',
                display: 'block'
            }
        }) : /*#__PURE__*/ _jsxs("div", {
            className: "gutter gutter--left gutter--right",
            children: [
                /*#__PURE__*/ _jsx(RenderTitle, {
                    className: "mb-8",
                    title: t('pluginUmami:analyticsTitle')
                }),
                /*#__PURE__*/ _jsx("p", {
                    style: {
                        color: 'var(--theme-elevation-500)',
                        marginTop: '1rem'
                    },
                    children: t('pluginUmami:analyticsNotConfigured')
                })
            ]
        })
    });
}

//# sourceMappingURL=index.js.map