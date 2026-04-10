import type { Config, Plugin } from 'payload'

import type { UmamiAnalyticsPluginConfig } from './types.js'

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
export function umamiAnalyticsPlugin(pluginConfig: UmamiAnalyticsPluginConfig = {}): Plugin {
  return (incomingConfig: Config): Config => {
    if (pluginConfig.enabled === false) return incomingConfig

    const config = { ...incomingConfig }
    const tenantsSlug = pluginConfig.tenantsCollectionSlug ?? 'tenants'

    // Store Umami URL in config.custom so RSC components can read it at runtime
    // without needing process.env access inside the component module boundary
    if (!config.custom) config.custom = {}
    config.custom.umamiUrl = process.env.UMAMI_URL ?? ''
    config.custom.umamiTenantsSlug = tenantsSlug

    // Add analytics fields to the Tenants collection
    config.collections = (config.collections ?? []).map((collection) => {
      if (collection.slug !== tenantsSlug) return collection
      return {
        ...collection,
        fields: [
          ...collection.fields,
          {
            type: 'collapsible',
            label: { en: 'Analytics', fr: 'Analytique' },
            admin: { initCollapsed: true },
            fields: [
              {
                type: 'group',
                name: 'analytics',
                label: { en: 'Umami Analytics', fr: 'Umami Analytique' },
                fields: [
                  {
                    name: 'umamiWebsiteId',
                    type: 'text',
                    label: { en: 'Umami Website ID', fr: 'ID site Umami' },
                    admin: {
                      description: {
                        en: "Website UUID from the Umami instance for this tenant's domain (found in Umami website settings).",
                        fr: "UUID du site dans l'instance Umami pour le domaine de ce tenant (dans les paramètres du site Umami).",
                      },
                    },
                  },
                  {
                    name: 'umamiShareToken',
                    type: 'text',
                    label: { en: 'Umami Share Token', fr: 'Token de partage Umami' },
                    admin: {
                      description: {
                        en: "Share token for the public Umami dashboard (the part after /share/ in the share URL). Enable sharing in Umami website settings.",
                        fr: "Token de partage du tableau de bord Umami public (la partie après /share/ dans l'URL de partage). Activez le partage dans les paramètres du site Umami.",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      }
    })

    // Register the /admin/analytics custom view
    if (!config.admin) config.admin = {}
    if (!config.admin.components) config.admin.components = {}
    if (!config.admin.components.views) config.admin.components.views = {}
    config.admin.components.views['umami-analytics'] = {
      Component: '@marsender/payload-plugin-umami-analytics/client#AnalyticsView',
      path: '/analytics',
    }

    return config
  }
}
