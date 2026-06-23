import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/nav";

export const Route = createFileRoute("/compare/booksy")({
  head: () => ({
    meta: [
      { title: "NailSuite vs Booksy — Save $15k+/year on Salon Software" },
      {
        name: "description",
        content:
          "See how NailSuite compares to Booksy. Own your booking site, customer list, and payments for a one-time $797 fee. No per-staff charges. No surprise price hikes.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CompareBooksyPage,
});

function CompareBooksyPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            NailSuite vs Booksy
          </h1>
        <p className="mt-4 text-muted-foreground">
          A detailed comparison is coming soon. In short: NailSuite does everything most salons
          use Booksy for — booking, client management, payments — without the $15k+/year in
          subscription and processing fees.
        </p>
      </div>
    </div>
    </>
  );
}
