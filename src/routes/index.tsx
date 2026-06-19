import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Sparkles,
  DollarSign,
  Users,
  CreditCard,
  Check,
  X,
  ArrowRight,
  Calendar,
  Search,
  Activity,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CAL_LINK = "donovin"; // cal.com/donovin

// ---- Cal.com lazy loader ---------------------------------------------------
// Defer the embed-react bundle + Cal script until user signals intent
// (hover, focus, or first click). Keeps initial JS lean — visitors who
// never book never pay the cost of the Cal embed.
let calLoadPromise: Promise<void> | null = null;
function loadCal(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (calLoadPromise) return calLoadPromise;
  calLoadPromise = import("@calcom/embed-react").then(async (mod) => {
    const cal = await mod.getCalApi();
    cal("ui", {
      theme: "light",
      styles: { branding: { brandColor: "#111111" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  });
  return calLoadPromise;
}

// ---- Conversion tracking ---------------------------------------------------
type TrackPayload = Record<string, string | number | boolean | undefined>;
function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload, ts: Date.now() });
  w.gtag?.("event", event, payload);
  // eslint-disable-next-line no-console
  console.log("[track]", event, payload);
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "How much will I actually save?",
    a: "Most salons we work with were paying $200–$400/month in Booksy or Vagaro seat fees plus 2.6% + $0.10 on every Square swipe. On $40k/month in card volume, that's around $1,160/mo in processing alone. Owning your own system typically saves $10,000–$18,000 per year — the license pays for itself in under 30 days.",
  },
  {
    q: "I'm a salon owner, not a developer. Which option is for me?",
    a: "If you (or anyone on your team) is comfortable copying API keys and following step-by-step instructions, the $797 single-use license works great — the documentation is written for non-developers. If you'd rather not touch any tech, the Integration & Deployment package ($5,797 total) means I install, brand, configure payments, and launch the whole thing on your domain. You just hand me your logo and Stripe login.",
  },
  {
    q: "Do I keep my own customers and payments?",
    a: "Yes. Every booking comes through your own website on your own domain. Payments go directly to your own Stripe account — nothing routes through Booksy, Vagaro, or any middleman. You own the customer list, the booking history, and every dollar (minus Stripe's standard rate).",
  },
  {
    q: "What do I actually get?",
    a: "A complete salon system: a public booking website (services, gallery, gift cards, 4-step booking), an owner dashboard (daily revenue, calendar, real-time floor board), a POS for walk-ins, commission tracking per stylist with CSV export, Twilio SMS confirmations and reminders, and online deposit collection. It's everything Booksy + Square does, but you own it.",
  },
  {
    q: "How long until I'm taking bookings?",
    a: "Single-use license: a focused afternoon if you follow the runbook. Integration & Deployment: I launch in 5–10 business days. Either way, you're off Booksy and onto your own system in under two weeks.",
  },
  {
    q: "Is the Integration & Deployment ongoing support a subscription?",
    a: "The $5,000 deployment fee includes 60 days of email support. After that, ongoing support is optional — $99/month covers updates, fixes, and adding new staff or services. Cancel anytime. You always own the code.",
  },
  {
    q: "Can I switch from Booksy or Vagaro without losing my client list?",
    a: "Yes. We import your existing client list, upcoming appointments, and service catalog from a CSV export. Most salons make the switch over a single weekend with zero downtime.",
  },
  {
    q: "What if I want a refund?",
    a: "14 days, no questions asked. If the system isn't a fit, you get your money back. The 'Not for you' section above is us being honest upfront — we'd rather not sell you something that won't work.",
  },
  {
    q: "What happens to my booking site if your company disappears?",
    a: "Nothing. You own the code, it lives on your own hosting, your own Stripe account, your own database. No 'phone home' calls to our servers. Even if we vanished tomorrow, your salon keeps running exactly the same.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Own Your Salon's Booking Site — Stop Paying Booksy & Square Fees" },
      {
        name: "description",
        content:
          "A complete salon booking site, POS, and dashboard built for nail salon owners. Stop paying $200/mo in Booksy fees. Single-use license $797 — save $10,000+/year.",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:title", content: "Stop renting your customers from Booksy. Own your salon's booking site." },
      {
        property: "og:description",
        content:
          "Complete nail salon booking site, POS, dashboard, and commission tracker. One-time license. Save $10,000+/year vs Booksy + Square.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Own your nail salon's booking site" },
      {
        name: "twitter:description",
        content: "Stop paying monthly Booksy fees. One-time license, save $10k+/year.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              name: "Salon Suite — Own Your Booking Site",
              description:
                "Complete nail salon management system: booking site, admin dashboard, POS, commission tracking. Built for salon owners.",
              brand: { "@type": "Brand", name: "Salon Suite" },
              offers: [
                { "@type": "Offer", name: "Single-Use License", price: "797", priceCurrency: "USD", availability: "https://schema.org/InStock" },
                { "@type": "Offer", name: "Integration & Deployment", price: "5797", priceCurrency: "USD", availability: "https://schema.org/InStock" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  // Lazy-init Cal once the browser is idle, so the embed bundle doesn't
  // block initial paint. Falls back to a timeout on browsers without
  // requestIdleCallback.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ric =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const id = ric(() => {
      void loadCal();
    });
    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (cic) cic(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Pain />
      <Solution />
      <Features />
      <Disqualify />
      <Offer />
      <FAQ />
      <Footer />
    </div>
  );
}

function CalLink({
  children,
  location,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  location: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full pl-6 pr-5 py-3.5 text-sm font-medium transition cursor-pointer";
  const styles =
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--background)] shadow-[var(--shadow-elegant)] hover:translate-y-[-1px]"
      : "border border-border bg-card text-foreground hover:bg-muted";
  // Warm up Cal on hover/focus — by the time the user clicks, the bundle
  // is already parsed and the popup opens instantly.
  const warm = () => {
    void loadCal();
  };
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-namespace=""
      data-cal-config='{"layout":"month_view","theme":"light"}'
      onMouseEnter={warm}
      onFocus={warm}
      onTouchStart={warm}
      onClick={() => {
        void loadCal();
        track("cta_click", { location });
      }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ink)] text-[var(--background)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Salon Suite</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#fit" className="hover:text-foreground">Who it's for</a>
          <a href="#offer" className="hover:text-foreground">Pricing</a>
        </nav>
        <button
          type="button"
          data-cal-link={CAL_LINK}
          data-cal-namespace=""
          data-cal-config='{"layout":"month_view","theme":"light"}'
          onMouseEnter={() => void loadCal()}
          onFocus={() => void loadCal()}
          onTouchStart={() => void loadCal()}
          onClick={() => {
            void loadCal();
            track("cta_click", { location: "nav" });
          }}
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
        >
          Book a free call
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--rose)]" />
            Built for nail salon owners
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Stop renting your customers from{" "}
            <span className="relative whitespace-nowrap text-[var(--rose)]">Booksy</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            A complete booking site, POS, and back-office for your salon — on your own domain, with your own Stripe account.
            For a typical 10-chair salon, that's roughly{" "}
            <span className="font-semibold text-foreground">$15,000–$18,000/year</span> kept out of seat fees and processing markups.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <CalLink location="hero_primary" className="sm:w-auto">
              Book a free 15-min call
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </CalLink>
            <a
              href="#offer"
              onClick={() => track("cta_click", { location: "hero_secondary", label: "See pricing" })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card pl-6 pr-5 py-3.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              See pricing
            </a>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:justify-center sm:gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rose)]/40 bg-[var(--blush)]/60 px-3 py-1 font-medium text-[var(--ink)]">
              <AlertTriangle className="h-3.5 w-3.5" />
              A 10-chair salon on Booksy + Square loses ~$1,300 every month. Stop the bleed.
            </span>
            <span className="hidden sm:inline">·</span>
            <span>One-time payment · You own it forever</span>
          </div>
        </div>

        {/* Product mock */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center gap-1.5 px-2 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--blush)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="ml-3 text-xs text-muted-foreground">app.yoursalon.com/admin</span>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-xl bg-background p-4 md:grid-cols-3">
              <MockKpi label="Today" value="$2,840" sub="32 bookings" />
              <MockKpi label="This week" value="$18,210" sub="+12% vs last" />
              <MockKpi label="Avg ticket" value="$88" sub="↑ from $74" />
              <div className="md:col-span-3 rounded-lg border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium">Floor — live</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rose)] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--rose)]" />
                    </span>
                    realtime
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  {[
                    { n: "Ana", s: "With client", c: "bg-[var(--blush)] text-[var(--ink)]" },
                    { n: "Mia", s: "Available", c: "bg-muted text-foreground" },
                    { n: "Jules", s: "With client", c: "bg-[var(--blush)] text-[var(--ink)]" },
                    { n: "Sam", s: "Offline", c: "bg-muted text-muted-foreground" },
                  ].map((s) => (
                    <div key={s.n} className={`rounded-md px-3 py-2 ${s.c}`}>
                      <div className="font-medium">{s.n}</div>
                      <div className="text-xs opacity-80">{s.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockKpi({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Pain() {
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">The math nobody runs</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Booksy, Square, and your spreadsheet quietly cost a 10-chair salon $15,000+ a year.
          </h2>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            There are three taxes most salon owners never add up: the <span className="text-foreground">subscription tax</span>{" "}
            (per-seat software fees), the <span className="text-foreground">processing tax</span> (marked-up card rates), and
            the <span className="text-foreground">Excel tax</span> (hours every week reconciling payroll and tips by hand).
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              k: "~$2,500/yr",
              t: "Subscription tax",
              d: "Booksy Biz Pro and Vagaro both charge a base fee plus per-staff seats. A 10-stylist salon typically lands at $200–$300/month — call it $2,400–$3,000/year in software alone.",
            },
            {
              k: "~$13,000/yr",
              t: "Processing tax",
              d: "Square in-person is 2.6% + $0.10 per swipe. On $40k/month in card volume that's ~$1,090/month, or roughly $13,000/year — gone before rent. Higher volume, higher bill.",
            },
            {
              k: "$2k–$5k/yr",
              t: "Excel tax",
              d: "Reconciling tips, commission, and payroll by hand for 10 employees eats 3–6 hours every week. At $25/hour that's $3,900–$7,800 of owner time you'll never bill back.",
            },
          ].map((p) => (
            <div key={p.t} className="rounded-xl border border-border bg-background p-6">
              <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--ink)]">{p.k}</div>
              <div className="mt-1 text-sm font-medium">{p.t}</div>
              <p className="mt-3 text-pretty text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-pretty text-base text-muted-foreground">
          For a typical 10-chair, $40k/month salon, that's roughly{" "}
          <span className="font-semibold text-foreground">$17,500–$21,000 per year</span> — every year, forever. A one-time
          $797 license pays for itself in about <span className="font-semibold text-foreground">3–4 months</span> of
          subscription + processing savings (sooner if your card volume is higher).
        </p>
        <p className="mt-3 max-w-2xl text-xs text-muted-foreground">
          Sources / assumptions: Booksy Biz Pro pricing as listed on{" "}
          <a href="https://booksy.com/biz/en-us/pricing" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">booksy.com/biz/pricing</a>{" "}
          and Square in-person rates at{" "}
          <a href="https://squareup.com/us/en/pricing" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">squareup.com/us/pricing</a>.
          Estimates assume a 10-stylist salon with $40k/month in card volume; your numbers may vary.
        </p>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">The fix</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            One system. Your website, bookings, POS, and back office.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Your clients book on <span className="text-foreground">your own salon website</span>, pay into{" "}
            <span className="text-foreground">your own Stripe account</span>, and the confirmation text comes from{" "}
            <span className="text-foreground">your salon's number</span>. No middleman taking a cut.
          </p>
          <p className="mt-4 text-muted-foreground">
            You get the same dashboard, calendar, floor board, POS, and commission ledger that the big chains use — without
            the monthly bill.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Booking website — services, gallery, gift cards, online deposits",
              "Owner dashboard — daily revenue, calendar, real-time floor board",
              "POS for walk-ins, with Stripe card reader support",
              "Per-stylist commission tracking with CSV export at payday",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rose)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between border-b border-border pb-3 text-sm">
              <span className="font-medium">Book — Gel Manicure</span>
              <span className="text-muted-foreground">Step 3 of 4</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
              {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
                <div key={d} className={`rounded-md border border-border px-2 py-3 text-center ${i === 1 ? "bg-[var(--ink)] text-[var(--background)]" : ""}`}>
                  <div className="opacity-70">{d}</div>
                  <div className="mt-1 font-semibold">{12 + i}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              {["10:00", "10:30", "11:00", "11:30", "1:00", "2:30"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md border px-3 py-2 ${i === 3 ? "border-[var(--rose)] bg-[var(--blush)] text-[var(--ink)]" : "border-border bg-background"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="mt-5 w-full rounded-md bg-[var(--ink)] py-2.5 text-sm font-medium text-[var(--background)]">
              Continue
            </button>
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rotate-3 rounded-xl border border-border bg-background p-3 text-xs shadow-[var(--shadow-soft)] sm:block">
            <div className="font-medium">New booking · Mia</div>
            <div className="text-muted-foreground">11:30 — Gel Manicure</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Activity,
      title: "Real-time floor board",
      body: "See at a glance which stylist is with a client, who's available, and who's running late — from the front desk or your phone at lunch.",
    },
    {
      icon: DollarSign,
      title: "Commission tracking that just adds up",
      body: "Set each stylist's commission % and hourly rate once. Every booking writes a commission row automatically. Export to CSV on payday — no more spreadsheets eating your Sundays.",
    },
    {
      icon: Search,
      title: "Your salon on Google, not Booksy's profile",
      body: "Built-in SEO means your salon shows up in local search — on your own domain. Reviews land on your Google profile, not the platform's.",
    },
    {
      icon: CreditCard,
      title: "Payments straight to your bank",
      body: "Online deposits and in-person card swipes go directly to your Stripe account. Standard processing rate — no marked-up 'platform fee' on top.",
    },
    {
      icon: Users,
      title: "Your client list, finally",
      body: "Every customer who books is yours. Names, phone numbers, visit history, preferred stylist — exportable any time. You're not renting access from a marketplace.",
    },
    {
      icon: Wrench,
      title: "No subscription. Ever.",
      body: "Pay once, own it forever. No 'per stylist' fees, no 'per booking' cuts, no surprise price hike next year because someone raised a Series C.",
    },
  ];
  return (
    <section id="features" className="bg-card border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">What's inside</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything Booksy and Square do — without the monthly bill.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-7">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--blush)] text-[var(--ink)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disqualify() {
  return (
    <section id="fit" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">Honest part</span>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          This isn't for every salon.
        </h2>
        <p className="mt-4 text-muted-foreground">
          We'd rather tell you upfront than refund you later.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-7">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--blush)]">
              <Check className="h-4 w-4" />
            </span>
            Good fit
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              "Salon owners with 2+ stylists doing $20k+/month in bookings",
              "Owners tired of Booksy, Vagaro, or Square taking a cut every month",
              "Salons ready to own their customer list and brand",
              "Owners with 1+ year ahead of them (so the savings compound)",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rose)]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-background p-7">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-muted">
              <X className="h-4 w-4" />
            </span>
            Not for you
          </div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              "Solo stylists who only need a calendar (free tools are fine)",
              "Salons doing under $5k/month — the savings won't justify it yet",
              "Owners who genuinely love the Booksy marketplace and its leads",
              "Anyone looking for a hosted SaaS with a monthly subscription",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <X className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="offer" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-6xl px-5 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">Pricing</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            You're not renting software. You're buying an asset.
          </h2>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            A comparable custom build from an agency runs <span className="font-mono text-foreground">$30k–$60k</span>.
            Either of these options recovers its cost in saved Booksy, Square, and admin overhead — usually inside 6 months for a 10-chair salon.
          </p>

          {/* Anchor: what you're losing right now */}
          <div className="mx-auto mt-7 inline-flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-[var(--rose)]/40 bg-[var(--blush)]/40 px-5 py-4 text-sm text-[var(--ink)] sm:flex-row sm:gap-4">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="text-pretty text-center sm:text-left">
              A 10-chair, $40k/month salon is bleeding roughly{" "}
              <span className="font-semibold">$17,500–$21,000/year</span> to subscription + processing fees alone.
              The real question isn't <em>"can I afford this?"</em> — it's <em>"how much longer can I afford Booksy?"</em>
            </span>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Single-Use License */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">The Asset</div>
                <div className="mt-1 text-lg font-medium">Single-Use License</div>
                <div className="mt-3 text-4xl font-semibold tracking-tight">$797</div>
                <div className="text-xs text-muted-foreground">one-time · install yourself</div>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                Best value
              </span>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              The rights to use the proprietary codebase at your single location. You install it
              yourself using step-by-step documentation written for non-developers. Most owners are
              live in an afternoon.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Full salon system source code",
                "Plain-English setup guide (no jargon)",
                "Stripe, Twilio SMS & email-ready integrations",
                "Free updates for 12 months",
                "Email support during setup",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rose)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <CalLink location="offer_diy" className="w-full">
                Book a free call
                <ArrowRight className="h-4 w-4" />
              </CalLink>
              <p className="mt-3 text-pretty text-center text-xs text-muted-foreground">
                Pays for itself in about <span className="font-medium text-foreground">3–4 months</span> of subscription + processing savings
              </p>
            </div>
          </div>

          {/* Integration & Deployment */}
          <div className="relative flex flex-col rounded-2xl border-2 border-[var(--rose)] bg-card p-8 shadow-[var(--shadow-elegant)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--rose)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Most popular
            </span>
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Asset + Labor</div>
                <div className="mt-1 text-lg font-medium">Integration & Deployment</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">$5,797</span>
                </div>
                <div className="text-xs text-muted-foreground">$797 license + $5,000 deployment</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              I customize the template, set up your private database, configure Stripe payments, build the
              Twilio text reminder workflows, and deploy the site to your domain. You hand me your logo and
              Stripe login — I do the rest. Live in 5–10 business days.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Everything in the Single-Use License, plus:",
                "Template customized to your brand & services",
                "Private Supabase database provisioned & secured",
                "Stripe payment processing configured end-to-end",
                "Twilio SMS reminder workflows built",
                "Site deployed to your custom domain",
                "Migration from Booksy / Vagaro / Square",
                "60 days of email support · optional $99/mo after",
              ].map((x, i) => (
                <li key={x} className="flex items-start gap-2.5">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${i === 0 ? "text-muted-foreground" : "text-[var(--rose)]"}`} />
                  <span className={i === 0 ? "font-medium" : ""}>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-7">
              <CalLink location="offer_dfy" className="w-full">
                Book a free call
                <ArrowRight className="h-4 w-4" />
              </CalLink>
              <p className="mt-3 text-pretty text-center text-xs text-muted-foreground">
                Pays for itself in roughly <span className="font-medium text-foreground">5–7 months</span> of subscription + processing savings
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--rose)]/40 bg-[var(--blush)]/60 px-4 py-2 text-sm font-medium text-[var(--ink)]">
            <Calendar className="h-4 w-4" />
            Taking 3 new Done-For-You salons this quarter. 2 spots left.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Not sure which is right? Book a free 15-minute call and we'll figure it out together.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--ink)] text-[var(--background)]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium text-foreground">Salon Suite</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#fit" className="hover:text-foreground">Who it's for</a>
          <a href="#offer" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

function FAQ() {
  return (
    <section id="faq" className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--rose)]">
            Questions before you book a call
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The stuff salon owners actually ask.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`}>
              <AccordionTrigger
                onClick={() => track("faq_open", { index: i, question: item.q })}
                className="text-left text-base font-medium"
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-pretty text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 rounded-2xl border border-border bg-background p-6 text-center">
          <p className="text-sm text-muted-foreground">Still have questions?</p>
          <CalLink location="faq_footer" className="mt-3">
            Book a free 15-min call <ArrowRight className="h-4 w-4" />
          </CalLink>
        </div>
      </div>
    </section>
  );
}
