import { jsx as _jsx } from "react/jsx-runtime";
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
 */ export function UmamiScript({ umamiUrl, websiteId }) {
    if (!umamiUrl || !websiteId) return null;
    return /*#__PURE__*/ _jsx("script", {
        async: true,
        defer: true,
        src: `${umamiUrl}/script.js`,
        "data-website-id": websiteId
    });
}

//# sourceMappingURL=index.js.map