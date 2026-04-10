type Props = {
  umamiUrl?: string | null
  websiteId?: string | null
}

/**
 * Renders the Umami tracking script tag.
 * Render this inside `<head>` in your root layout.tsx.
 *
 * Umami is cookie-free — no GDPR consent banner is required.
 *
 * @example
 * ```tsx
 * // src/app/(app)/[locale]/layout.tsx
 * import { UmamiScript } from '@marsender/payload-plugin-umami-analytics'
 *
 * // In <head>:
 * <UmamiScript
 *   umamiUrl={process.env.UMAMI_URL}
 *   websiteId={tenant?.analytics?.umamiWebsiteId}
 * />
 * ```
 */
export function UmamiScript({ umamiUrl, websiteId }: Props) {
  if (!umamiUrl || !websiteId) return null
  return (
    <script
      async
      defer
      src={`${umamiUrl}/script.js`}
      data-website-id={websiteId}
    />
  )
}
