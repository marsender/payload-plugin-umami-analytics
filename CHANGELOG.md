# Changelog

All notable changes to `@marsender/payload-plugin-umami-analytics` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.82.6] - 2026-04-10

### Added
- `UmamiScript`: new `proxyPath` prop to route the tracking script and events through a custom path, bypassing ad blockers
- `husky` pre-commit hook: lints staged TypeScript files, runs `tsc -b` type-check, and rebuilds `dist/`
- `jiti` dev dependency required to load the TypeScript ESLint flat config

## [3.82.4] - 2026-04-10

### Changed
- `AnalyticsView`: when the iframe is loaded, gutters are removed so the Umami scrollbar sits flush at the viewport edge; the iframe height is `calc(100vh - 120px)` to fill the view without wasted space
- `AnalyticsView`: "not configured" state retains the gutter and title layout unchanged

### Added
- i18n support in `AnalyticsView`: title and "analytics not configured" message are now translated via `req.i18n.t()`
- Plugin registers a `pluginUmami` translation namespace with `en` and `fr` strings; additional languages can be added by consumers via `config.i18n.translations`

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
