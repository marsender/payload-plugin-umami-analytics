type Props = {
  umamiUrl?: string | null
  websiteId?: string | null
  /**
   * Optional proxy path to bypass ad blockers.
   * When set (e.g. "/metrics"), the script is loaded from `{proxyPath}/script.js`
   * and tracking data is sent to `{proxyPath}/api/send` via Next.js rewrites.
   * This avoids exposing the analytics domain in browser requests.
   */
  proxyPath?: string | null
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
 *   proxyPath={process.env.UMAMI_URL ? '/metrics' : undefined}
 * />
 * ```
 */
export function UmamiScript({ umamiUrl, websiteId, proxyPath }: Props) {
  if (!websiteId) return null
  if (proxyPath) {
    return (
      <script
        async
        defer
        src={`${proxyPath}/script.js`}
        data-website-id={websiteId}
        data-host-url={proxyPath}
      />
    )
  }
  if (!umamiUrl) return null
  return (
    <script
      async
      defer
      src={`${umamiUrl}/script.js`}
      data-website-id={websiteId}
    />
  )
}
