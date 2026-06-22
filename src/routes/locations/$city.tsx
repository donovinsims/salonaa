import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/locations/$city")({
  head: ({ params }) => ({
    meta: [
      {
        title: `NailSuite in ${params.city} — Nail Salon Software for Independent Owners`,
      },
      {
        name: "description",
        content: `NailSuite in ${params.city}: own your booking site and payments for a one-time fee. No monthly subscriptions. Built for nail salon owners who want independence.`,
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useParams();

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
          NailSuite in {city}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Nail salon software for independent owners in {city}. A detailed page about NailSuite
          availability and benefits in {city} is coming soon.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--background)]"
          >
            Learn more about NailSuite
          </Link>
        </div>
      </div>
    </div>
  );
}
