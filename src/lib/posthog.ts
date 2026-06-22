import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ||
  "https://us.i.posthog.com";

/**
 * Initialize PostHog client-side analytics.
 * Safe to call multiple times — posthog-js guards against double init.
 * In dev mode, capturing is automatically opted out so dev traffic
 * doesn't pollute production data.
 */
export function initPostHog(): void {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) {
    if (import.meta.env.DEV) {
      console.warn(
        "[PostHog] Skipping init: VITE_PUBLIC_POSTHOG_KEY is not set. " +
          "Set it in your .env file to enable analytics.",
      );
    }
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // manual capture via TanStack Router
    capture_performance: true, // web vitals
    persistence: "localStorage",
    loaded: () => {
      if (import.meta.env.DEV) {
        posthog.opt_out_capturing();
      }
    },
  });
}

/**
 * Capture a `$pageview` event — call this on every route change.
 */
export function capturePageView(): void {
  if (typeof window === "undefined") return;
  posthog.capture("$pageview");
}

/**
 * Capture a custom event with optional properties.
 */
export function captureEvent(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export { posthog };
