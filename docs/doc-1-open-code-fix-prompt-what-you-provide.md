# Doc 1 — Open-Code Fix Prompt (+ what you provide)

## How to run this

Paste the prompt in the next section into your coding agent (Lovable's code/agent mode, or your 'big pickle' model in open-code). It's model-agnostic — any capable coding model can execute it.

**Two-step setup:**
1. Drop the file **salon-suite-website-fixes.md** (Doc 3) into the repo root so the agent can read the full itemized task list.
2. Fill in the bracketed values in the **"What you must provide"** block at the bottom of the prompt, then paste the whole thing.

Work in **small, reviewable commits** (one section per commit) and keep the branch deployable — this repo syncs to Lovable, so don't rewrite published history (no force-push/rebase of pushed commits).

## THE PROMPT (copy/paste)

```
You are a senior full-stack engineer + conversion copywriter working on my live marketing site.

REPO: this project (github.com/donovinsims/salonaa). Stack: TanStack Start (React 19) + Tailwind v4, file-based routing in src/routes, deployed via Lovable → Cloudflare. It is a single-page marketing site for "Salon Suite — The Salon Independence Kit," a white-label nail-salon booking/POS codebase sold to salon owners. Payments are handled by Polar.sh.

TASK: Implement every item in ./salon-suite-website-fixes.md, working in priority order (P0 → P1 → P2). That file is the source of truth; this prompt sets the rules. After each section (A–G), stop and summarize what changed so I can review.

HARD RULES:
1. HONESTY — never write copy, schema, pricing line-items, or guarantee text that overstates the product. Real today: booking site, Stripe online DEPOSITS, SMS CONFIRMATIONS, commission CSV export, owner dashboard, walk-in checkout. NOT built (label "coming soon" in body copy ONLY, never in schema/pricing/guarantee): in-person card-reader POS, AI receptionist, one-click Booksy/Vagaro migration, SMS REMINDER workflows. Do not invent testimonials, customer counts, or savings numbers.
2. Don't break the build or Lovable sync. No force-push, rebase, or amend of already-pushed commits. Keep TypeScript strict; run `bunx tsc --noEmit` + `bun run build` before each commit and fix any errors.
3. Secrets go in environment variables / Cloudflare secrets — never hardcode keys. Don't commit .env.
4. Make small, focused commits with clear messages; one fix-list section per commit where practical.

EXECUTION ORDER (matches the fix list):
- SECTION A (honesty/legal, P0): fix /privacy corrupted text ("客户的") + update dates to today + Vercel→Cloudflare + remove unsupported analytics mention; relabel card-reader POS → "Walk-in checkout via dashboard"; SMS reminders → confirmations everywhere; rewrite FAQ #3 + bonus names to honest CSV-assisted migration; make the JSON-LD Product/FAQ match reality; reframe the guarantee precisely and fix the "cancel anytime" contradiction; make the "2 of 3 spots" and "July 15" claims real or reframe (see Polar note below).
- SECTION B (conversion, P0/P1): replace ALL `mailto:` Buy buttons with the live Polar checkout links I provide below; add a name+email lead-capture opt-in ("free Booksy Fee Calculator") between FAQ and footer wired to /api/public/lead; add a demo video embed slot in the Solution section; fix CTA hierarchy (Buy = primary, Book-a-call = ghost); add the founder authority block; add the DFY payment-plan line; expand the FAQ with the missing objections.
- SECTION C/D/E (offer + copy + persuasion, P1/P2): recalculate the value stack to an honest ~10:1, rewrite the hero subhead benefit-first, add "so what" outcome bridges to the 6 features, add the reciprocity calculator + micro-commitment quiz + unity line, swap the "Most popular" badge.
- SECTION F (SEO): remove the duplicate twitter:card from __root.tsx; move og:image to a committed /public/og-image.png on my domain; add /sitemap.xml + /robots.txt routes + /public/llms.txt; add canonical tags; add Organization/LocalBusiness JSON-LD; shorten <title> to ~60 chars; scaffold /features, /compare/booksy, /compare/vagaro, /guarantee, and /locations/[city] route stubs with unique copy; add a google-site-verification meta placeholder; add alt text to the dashboard image.
- SECTION G (technical/security): harden /api/public/lead (lock CORS to my domain, add honeypot + rate limit, stop logging raw PII) and wire it to deliver leads to the destination I provide; add security headers; wire analytics or remove track(); add a root README; prune unused shadcn components; pin nitro+vite to stable; add a smoke test for the lead Zod schema.

ACCEPTANCE CRITERIA: `bunx tsc --noEmit` and `bun run build` pass; no `mailto:` purchase links remain; every claim on the page is true per the honesty rules; /sitemap.xml, /robots.txt, /public/llms.txt, /public/og-image.png exist; /privacy and /terms are clean and current; Lighthouse SEO ≥ 95.

Proceed section by section. After each, list the files you changed and ask me to confirm before continuing.

=== WHAT I'M PROVIDING (fill these in before running) ===
- Polar DIY checkout link: [PASTE]
- Polar DFY checkout link: [PASTE]
- Lead destination (email address OR CRM/Resend — I'll add the API key as a Cloudflare secret named RESEND_API_KEY): [PASTE]
- Production domain for canonical/sitemap/og: [e.g. https://salonsuite.com]
- OG image (1200×630) — I'll drop the file at /public/og-image.png: [CONFIRM done / or asset link]
- Founder block: name, one-line credential, photo path, LinkedIn/Loom URL, 2–3 sentence "why I built this" story: [PASTE]
- Cal.com link: cal.com/donovin (confirm)
- Testimonials: [either paste REAL quotes with first name + city + consent, OR write "remove the testimonial band for now"]
- DFY availability: [real number, OR "make it dynamic from Polar orders," OR "reframe without a count"]
- Price-lock: [confirm I've scheduled the $797→$997 change in Polar for (date), OR "reframe as founding price with no date"]
- Analytics: [GA4/Plausible ID to wire, OR "remove track()"]
- Google Search Console verification token: [PASTE or "skip for now"]
```

## What you must provide personally (the human inputs)

The agent can write all the code, but these are decisions/assets only you can supply. Gather them first (most come from Doc 2 — Polar):

1. **Two Polar checkout links** (DIY $797, DFY $5,797) — created in Doc 2. This unblocks the #1 conversion fix.
2. **Lead destination** — the email or CRM where opt-in leads should land (+ an API key like Resend, which you add as a Cloudflare secret, not in code).
3. **Production domain** (e.g. salonsuite.com) — needed for canonical tags, sitemap, and a stable OG image. If you're staying on the .lovable.app URL for now, say so.
4. **A real OG image** (1200×630 PNG) — your branded share image, committed to /public. Replaces the fragile Lovable preview URL.
5. **Founder block content** — your name, a one-line credential, a photo, a LinkedIn/Loom link, and 2–3 honest sentences on why you built this. (Biggest trust lever for the $5,797 buyer.)
6. **Testimonials decision** — paste real, attributable quotes (first name + city + their OK to use), or approve removing the band until you have them. Don't ship unverified quotes.
7. **Scarcity/urgency truth** — a real DFY availability number (or make it dynamic / reframe), and either schedule the $797→$997 increase in Polar for a real date or drop the date.
8. **Claims confirmation** — confirm which of POS / SMS reminders / migration are still roadmap so the copy stays honest (default assumption: all three are roadmap/manual).
9. **Analytics ID** (GA4 or Plausible) if you want `track()` wired — otherwise it gets removed.
10. **(Optional) Google Search Console token** to verify the domain and submit the sitemap.

Everything else (code, copy rewrites, SEO routes, schema, security) the agent handles.
