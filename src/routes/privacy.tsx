import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Salon Suite" },
      {
        name: "description",
        content: "Privacy Policy for Salon Suite — how we handle your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <Link
          to="/"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. What we collect</h2>
            <p>
              We collect information you provide directly: name, email, phone number, and payment
              details when you purchase a license or sign up for the Done-For-You service. We also
              collect usage data (page views, feature interactions) to improve the product.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. How we use it</h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>To process your license purchase and deliver the software</li>
              <li>To provide support and setup assistance</li>
              <li>To send transactional emails (receipts, updates, support)</li>
              <li>To improve the product based on usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. Data sharing</h2>
            <p>
              We do not sell your personal information. We share data only with service providers
              who help us operate (Stripe for payments, Cloudflare for hosting, Twilio if you opt into
              messaging features) — and they are bound by data processing agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">4. Your salon's data</h2>
            <p>
              When you deploy the Salon Suite codebase, client and booking data lives in your own
              database, on your own cloud infrastructure. We do not have access to the data stored
              in your deployment unless you explicitly grant it for support.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">5. Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any
              time by emailing support@salonsuite.com.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Contact</h2>
            <p>
              Salon Suite · Roscoe, IL<br />
              support@salonsuite.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
