import { Sparkles } from "lucide-react";
import { captureEvent } from "@/lib/posthog";

// ---- Conversion tracking ---------------------------------------------------
type TrackPayload = Record<string, string | number | boolean | undefined>;
function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  captureEvent(event, payload);
}

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

const CAL_LINK = "donovin"; // cal.com/donovin
const BUY_LINK =
  "https://buy.polar.sh/polar_cl_gsORyMWrkMpFp1XfZYo0b8hF0HDTkV9dUPhab1Fdg67";

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ink)] text-[var(--background)]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>NailSuite</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="/#features" className="hover:text-foreground">Features</a>
          <a href="/#fit" className="hover:text-foreground">Who it's for</a>
          <a href="/#offer" className="hover:text-foreground">Pricing</a>
          <a href="/#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/#offer"
            onClick={() => track("cta_click", { location: "nav_buy", label: "Buy — $597" })}
            className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
          >
            Buy — $597{" "}
            <span className="text-xs opacity-80">founding</span>
          </a>
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
            className="hidden rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition hover:bg-muted sm:inline-flex"
          >
            Book a free 15-min call
          </button>
          <a
            href="mailto:nailsuite@clockout.us"
            className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-[var(--rose)] transition-colors"
          >
            Email us
          </a>
        </div>
      </div>
    </header>
  );
}

export default Nav;
export { CAL_LINK, BUY_LINK, loadCal };
