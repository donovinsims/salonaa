import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/nav";

export const Route = createFileRoute("/compare/vagaro")({
  head: () => ({
    meta: [
      { title: "NailSuite vs Vagaro — Own Your Booking System for $797" },
      {
        name: "description",
        content:
          "Compare NailSuite vs Vagaro. Get the same core functionality — booking, payments, client management — without the monthly subscription. One-time fee. You own the code.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CompareVagaroPage,
});

function CompareVagaroPage() {
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            NailSuite vs Vagaro
          </h1>
        <p className="mt-4 text-muted-foreground">
          A detailed comparison is coming soon. The short version: NailSuite gives you booking,
          payments, and salon management for a one-time fee — no monthly Vagaro bill eating into
          your margin.
        </p>
      </div>
    </div>
    </>
  );
}
