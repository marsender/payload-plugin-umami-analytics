# @marsender/payload-plugin-umami-analytics

A Payload CMS plugin that adds per-tenant [Umami Analytics](https://umami.is/) support.

**RGPD / GDPR compliant** — Umami is cookie-free and collects no personal data. No consent banner required.

## Features

- Adds `analytics.umamiWebsiteId` and `analytics.umamiShareToken` fields to the Tenants collection (super-admin only)
- Registers a custom admin view at `/admin/analytics` showing the Umami dashboard in an iframe
- Exports `<UmamiScript>` for tracking script injection in your app layout

## Installation

```bash
pnpm add github:marsender/payload-plugin-umami-analytics#v3.82.1
```

## Environment Variable

```env
UMAMI_URL=https://analytics.example.com
```

## Usage

### 1. Register the plugin

```typescript
// src/plugins/index.ts
import { umamiAnalyticsPlugin } from '@marsender/payload-plugin-umami-analytics'

export const plugins = [
  // ...other plugins
  umamiAnalyticsPlugin(),
]
```

### 2. Inject the tracking script (layout.tsx)

```tsx
import { UmamiScript } from '@marsender/payload-plugin-umami-analytics'
import { getTenant } from '@/utilities/getTenantGlobals'

const tenant = await getTenant()

// Inside <head>:
<UmamiScript
  umamiUrl={process.env.UMAMI_URL}
  websiteId={tenant?.analytics?.umamiWebsiteId}
/>
```

### 3. Add analytics nav link

Create a project-level utility (cannot live in the plugin because it requires `@payload-config`,
a virtual module alias that only exists in the consuming project):

```typescript
// src/lib/analytics/utilities.ts
import type { Tenant } from '@/payload-types'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export async function isAnalyticsEnabledForTenant(tenantId: number | null): Promise<boolean> {
  if (!tenantId || !process.env.UMAMI_URL) return false
  const payload = await getPayload({ config: configPromise })
  const tenant = (await payload.findByID({ collection: 'tenants', id: tenantId })) as Tenant
  return !!tenant?.analytics?.umamiShareToken
}
```

```tsx
// src/components/admin/BeforeNavLinksGroup.tsx
import { isAnalyticsEnabledForTenant } from '@/lib/analytics/utilities'
import { BarChart2 } from 'lucide-react'

const isAnalyticsEnabled = await isAnalyticsEnabledForTenant(tenantId)

{tenantId && isAnalyticsEnabled && (
  <AdminNavLink href="/admin/analytics">
    <span className="nav__link-label">{t('analyticsLink')}</span>
    <BarChart2 className="nav__icon" width={16} height={16} style={{ marginLeft: '4px' }} />
  </AdminNavLink>
)}
```

## Umami Setup (per tenant, by super-admin)

1. In Umami, add a website for the tenant's domain
2. Copy the **Website ID** (UUID) from Umami website settings
3. Enable **Share** → copy the token from the share URL (part after `/share/`)
4. In Payload admin → Tenants → Analytics section:
   - **Umami Website ID** → paste the UUID
   - **Umami Share Token** → paste the share token

## Plugin Configuration

```typescript
umamiAnalyticsPlugin({
  tenantsCollectionSlug: 'tenants', // default
  enabled: true,                    // default
})
```
