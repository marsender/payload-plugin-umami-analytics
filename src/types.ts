export interface UmamiAnalyticsPluginConfig {
  /**
   * Slug of the collection to add analytics fields to.
   * @default 'tenants'
   */
  tenantsCollectionSlug?: string
  /**
   * Set to false to disable the plugin entirely.
   * @default true
   */
  enabled?: boolean
}
