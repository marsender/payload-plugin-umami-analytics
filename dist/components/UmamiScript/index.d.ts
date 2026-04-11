type Props = {
    umamiUrl?: string | null;
    websiteId?: string | null;
    /**
     * Optional proxy path to bypass ad blockers.
     * When set (e.g. "/metrics"), the script is loaded from `{proxyPath}/script.js`
     * and tracking data is sent to `{proxyPath}/api/send` via Next.js rewrites.
     * This avoids exposing the analytics domain in browser requests.
     */
    proxyPath?: string | null;
};
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
export declare function UmamiScript({ umamiUrl, websiteId, proxyPath }: Props): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map