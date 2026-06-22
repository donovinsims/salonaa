import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/compare/booksy")({
  head: () => ({
    meta: [
      { title: "Salon Suite vs Booksy — Save $15k+/year on Salon Software" },
      {
        name: "description",
        content:
          "See how Salon Suite compares to Booksy. Own your booking site, customer list, and payments for a one-time $797 fee. No per-staff charges. No surprise price hikes.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CompareBooksyPage,
});

function CompareBooksyPage() {
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
          Salon Suite vs Booksy
        </h1>
        <p className="mt-4 text-muted-foreground">
          A detailed comparison is coming soon. In short: Salon Suite does everything most salons
          use Booksy for — booking, client management, payments — without the $15k+/year in
          subscription and processing fees.
        </p>
      </div>
    </div>
  );
}
