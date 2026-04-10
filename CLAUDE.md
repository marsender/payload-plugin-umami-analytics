# payload-plugin-umami-analytics Development Guidelines

**Package**: `@marsender/payload-plugin-umami-analytics` v3.82.1
**Last updated**: 2026-04-09

## Active Technologies

| Tool | Version |
|------|---------|
| TypeScript | ^5.9.3 |
| Node.js | ^18.20.2 \|\| >=20.9.0 |
| pnpm | ^9 \|\| ^10 |
| payload | ^3.0.0 (peer) |
| @payloadcms/next | ^3.0.0 (peer) |
| @payloadcms/ui | ^3.0.0 (peer) |
| react / react-dom | ^19.0.0 (peer) |
| SWC | ^1.15.8 |

## Project Structure

```text
src/
  index.ts                          # Public exports: umamiAnalyticsPlugin, UmamiScript, isAnalyticsEnabledForTenant
  types.ts                          # UmamiAnalyticsPluginConfig
  plugin.ts                         # Plugin factory: umamiAnalyticsPlugin(config)
  utilities.ts                      # isAnalyticsEnabledForTenant(payload, tenantId)
  components/
    UmamiScript/
      index.tsx                     # <UmamiScript umamiUrl websiteId> — renders <script> tag for tracking
    AnalyticsView/
      index.tsx                     # Admin view at /admin/analytics — Umami iframe dashboard (RSC)
  exports/
    client.ts                       # Client-side export: AnalyticsView re-export
```

## Package Exports

| Export path | Entry point | Contents |
|------------|-------------|----------|
| `.` | `dist/index.js` | `umamiAnalyticsPlugin` factory, `UmamiScript`, `isAnalyticsEnabledForTenant` |
| `./client` | `dist/exports/client.js` | `AnalyticsView` admin view component |

## Commands

```bash
# Type-check
pnpm type-check

# Build (tsc declarations → swc)
pnpm build

# Lint
pnpm lint
pnpm lint:fix

# Clean build artifacts
pnpm clean
```

## Build Pipeline

`pnpm build` runs two steps in order:
1. **build:types** — `tsc --emitDeclarationOnly` → `.d.ts` files in `dist/`
2. **build:swc** — `swc ./src -d ./dist` → fast transpilation of TS to ESM JS

## Key Architecture

### Plugin Init (`src/plugin.ts`)
- Stores `UMAMI_URL` env var in `payload.config.custom.umamiUrl` (server-side, avoids serialization issues)
- Stores `tenantsCollectionSlug` in `payload.config.custom.umamiTenantsSlug`
- Adds `analytics` group fields (`umamiWebsiteId`, `umamiShareToken`) to the configured tenants collection inside a collapsible wrapper
- Registers `AnalyticsView` as a custom admin view at `/admin/analytics`

### Analytics View (`src/components/AnalyticsView/index.tsx`)
React Server Component (RSC). Resolves the authenticated user's first tenant, fetches `analytics.umamiShareToken`, and renders an iframe pointing to `{UMAMI_URL}/share/{shareToken}`. Shows a placeholder message when analytics is not configured.

### UmamiScript (`src/components/UmamiScript/index.tsx`)
Renders `<script async defer src="{umamiUrl}/script.js" data-website-id="{websiteId}">`. Returns `null` if either prop is missing. Render inside `<head>` in the root `layout.tsx`. Umami is cookie-free — no GDPR consent banner required.

### Tenant Fields
Added to the configured tenants collection (default slug: `tenants`) as a collapsible group:
- `analytics.umamiWebsiteId` — Website UUID from the Umami instance
- `analytics.umamiShareToken` — Share token for the public Umami dashboard (part after `/share/` in the share URL)

## Manual Wiring Required in Consumer Projects

The plugin handles field injection and view registration automatically. The following must be wired manually:

1. Render `<UmamiScript>` inside `<head>` in `layout.tsx` for tracking script injection
2. Add an analytics nav link to your `BeforeNavLinksGroup` component
3. Add translations for the nav link label

## Important Implementation Details

- `AnalyticsView` is exported via `./client` path to avoid CSS import issues during Payload CLI operations
- `tenantId` is resolved from `req.user.tenants[0].tenant` — works with Payload's multi-tenant pattern
- `payload.findByID` is called with `overrideAccess: true` (local API default) to read tenant analytics fields regardless of access rules
- No runtime dependencies beyond peer deps — the plugin is purely configuration + RSC components

## Development Workflow

```bash
# Fresh install (e.g. after upgrading Payload version)
pnpm store prune
rm -rf node_modules && rm pnpm-lock.yaml
pnpm install

# Upgrade Payload peer deps
pnpm update payload@<version> @payloadcms/next@<version> @payloadcms/ui@<version>

# Full validation before commit
pnpm type-check && pnpm build && pnpm lint

# Commit and tag release
git add .
git commit -m "<message>"
git push
git tag v<version>
git push origin v<version>
```

## Reference Projects

- Structure pattern: `/opt/git/marsender/payload-plugin-deepl-translate/`

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
