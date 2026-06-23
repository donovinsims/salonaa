import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { PostHogProvider } from "@/components/posthog-provider";
import appCss from "../styles.css?url";

// Production domain: nailsuite.vercel.app
const SITE_URL = "https://nailsuite.vercel.app";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NailSuite — Own Your Booking Site. Stop the $15k Tax." },
      { name: "description", content: "Own your salon's booking site, customer list, and Stripe payments — for a one-time $797 fee. 10-chair salons keep $15k–$21k/year. 60-Day Salon Savings Guarantee." },
      { name: "author", content: "NailSuite" },
      // TODO: Replace with actual Google Search Console verification token
      { name: "google-site-verification", content: "YOUR_VERIFICATION_TOKEN" },
      { property: "og:title", content: "NailSuite — Stop Paying the $15k Booksy Tax" },
      { property: "og:description", content: "Own your booking site and back office for a one-time $797. 60-Day Salon Savings Guarantee." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "NailSuite" },
      { name: "twitter:description", content: "Own your salon booking site for a one-time $797. Save $15k+/year vs Booksy + Square." },
      // TODO: Replace with user's OG image at /og-image.png (1200×630 PNG)
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "NailSuite",
              url: SITE_URL,
              description: "The Nail Salon Independence Kit — white-label nail-salon booking/POS codebase sold as a one-time license.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "nailsuite@clockout.us",
                contactType: "customer support",
              },
            },
            {
              "@type": "LocalBusiness",
              name: "NailSuite",
              url: SITE_URL,
              areaServed: "US",
              availableLanguage: "en",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </PostHogProvider>
    </QueryClientProvider>
  );
}
