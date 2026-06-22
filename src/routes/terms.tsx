import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — NailSuite" },
      {
        name: "description",
        content: "Terms of Service for NailSuite — your rights and obligations when purchasing the Nail Salon Independence Kit.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">1. License Grant</h2>
            <p>
              Upon purchase of the Single-Use License ($797), you receive a non-exclusive,
              non-transferable license to use the NailSuite codebase at a single business
              location. You may not resell, redistribute, or sublicense the code.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">2. Ownership</h2>
            <p>
              You own the code you deploy. NailSuite retains copyright of the original template.
              Your modifications, branding, and data are your property.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">3. 60-Day Salon Savings Guarantee</h2>
            <p>
              If within 60 days of purchase you have not saved at least $1,000 in subscription and
              processing fees compared to your previous system, we will refund the full license fee
              upon request and provide reasonable assistance migrating back. This guarantee applies
              to the Single-Use License ($797); Done-For-You deployment fees are non-refundable
              after work has begun.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">4. Support</h2>
            <p>
              DIY License holders receive 12 months of updates and email support. Done-For-You
              clients receive 12 months of priority support. Support is provided via email at
              nailsuite@clockout.us during regular business hours.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>
              NailSuite is provided "as is" without warranty of any kind. In no event shall
              NailSuite be liable for any damages arising from the use of the software. This
              does not affect your statutory rights.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-foreground">6. Contact</h2>
            <p>
              NailSuite · Roscoe, IL<br />
              nailsuite@clockout.us
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
