import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "NailSuite Features — Booking, Dashboard, Commission Tracking" },
      {
        name: "description",
        content:
          "Explore everything NailSuite includes: booking website, owner dashboard, walk-in checkout, commission tracking, SMS confirmations, and your own Stripe payments — all for a one-time fee.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Features</h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to run your salon independently. Coming soon — detailed feature
          breakdown. In the meantime, check out the homepage for the full list.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {[
            "Booking website on your own domain",
            "Owner dashboard with real-time floor board",
            "Walk-in checkout via dashboard",
            "Per-stylist commission tracking with CSV export",
            "SMS booking confirmations",
            "Payments straight to your Stripe account",
            "Gift card module",
            "Your client list — exportable anytime",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-0.5 text-[var(--rose)]">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
