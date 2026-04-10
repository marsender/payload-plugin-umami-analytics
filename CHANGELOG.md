# Changelog

All notable changes to `@marsender/payload-plugin-umami-analytics` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.82.1] - 2026-04-09

### Added
- Initial plugin implementation: `umamiAnalyticsPlugin(config)` factory
- `UmamiScript` React component for injecting the Umami tracking script in `<head>`
- `AnalyticsView` admin view registered at `/admin/analytics` (iframe dashboard)
- `isAnalyticsEnabledForTenant` utility to check analytics configuration for a tenant
- `analytics.umamiWebsiteId` and `analytics.umamiShareToken` fields added to the Tenants collection (collapsible group, super-admin only)
- `UMAMI_URL` stored in `config.custom` for use by RSC components
- Multi-tenant support: each tenant has its own Umami website ID and share token
- `tenantsCollectionSlug` config option to target a custom tenants collection slug
- `enabled` config option to disable the plugin entirely
- Cookie-free analytics — no GDPR consent banner required
- TypeScript strict mode; ESM-only build via SWC
- Support for installation as a git dependency
