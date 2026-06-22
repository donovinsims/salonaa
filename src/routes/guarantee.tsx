import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guarantee")({
  head: () => ({
    meta: [
      { title: "60-Day Salon Savings Guarantee — NailSuite" },
      {
        name: "description",
        content:
          "The 60-Day Salon Savings Guarantee: if NailSuite doesn't save you at least $1,000 in fees within 60 days, we refund every cent. Risk-free.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: GuaranteePage,
});

function GuaranteePage() {
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
          60-Day Salon Savings Guarantee
        </h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Install NailSuite. Use it for 60 days. If you haven't saved at least $1,000 in
            combined subscription and processing fees compared to your previous system, we refund
            the full license fee — and help you migrate back.
          </p>
          <p>
            This guarantee applies to the Single-Use License ($797). Done-For-You deployment fees
            ($5,000) are non-refundable after work has begun, though the $797 license component is
            still covered.
          </p>
          <p>
            You literally cannot lose. If the savings aren't there, the license is free, and you go
            back to your old system with nothing lost but a weekend of setup.
          </p>
        </div>
      </div>
    </div>
  );
}
