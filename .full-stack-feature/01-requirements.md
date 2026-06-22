# Requirements: Salon Suite Marketing Site Fixes

## Problem Statement

The Salon Suite marketing site — the primary sales vehicle for a white-label nail-salon booking/POS codebase — has legal/compliance issues (corrupted privacy text, wrong dates, unsupported claims), weak conversion paths (mailto: links instead of live checkout, missing lead capture), outdated copy that overstates product capabilities, poor SEO, and security gaps. A full sweep (sections A–G) is needed to make the site honest, conversion-optimized, SEO-strong, and technically solid.

## Acceptance Criteria

- `bunx tsc --noEmit` passes with no new errors
- `bun run build` passes
- No `mailto:` purchase links remain on the site
- Every claim on the page is true per the honesty rules (no overstating product capabilities)
- `/sitemap.xml`, `/robots.txt`, `/public/llms.txt`, `/public/og-image.png` exist
- `/privacy` and `/terms` are clean and current
- Lighthouse SEO ≥ 95
- Small, focused commits per section; one fix-list section per commit where practical

## Scope

### In Scope

**Section A (P0 — Honesty/Legal):**
- Fix /privacy corrupted text ("客户的") + update dates to today + Vercel→Cloudflare + remove unsupported analytics mention
- Relabel card-reader POS → "Walk-in checkout via dashboard"
- SMS reminders → confirmations everywhere
- Rewrite FAQ #3 + bonus names to honest CSV-assisted migration
- Make JSON-LD Product/FAQ match reality
- Reframe guarantee precisely, fix "cancel anytime" contradiction
- Make scarcity/urgency claims ("2 of 3 spots", "July 15") real or reframe

**Section B (P0/P1 — Conversion):**
- Replace ALL `mailto:` Buy buttons with Polar checkout links (needs user input)
- Add name+email lead-capture opt-in between FAQ and footer wired to /api/public/lead (needs lead destination)
- Add demo video embed slot in Solution section
- Fix CTA hierarchy (Buy = primary, Book-a-call = ghost)
- Add founder authority block (needs user input)
- Add DFY payment-plan line
- Expand FAQ with missing objections

**Section C/D/E (P1/P2 — Offer/Copy/Persuasion):**
- Recalculate value stack to honest ~10:1
- Rewrite hero subhead benefit-first
- Add "so what" outcome bridges to 6 features
- Add reciprocity calculator + micro-commitment quiz + unity line
- Swap "Most popular" badge

**Section F (P1 — SEO):**
- Remove duplicate twitter:card from __root.tsx
- Move og:image to committed /public/og-image.png (needs user input)
- Add /sitemap.xml + /robots.txt routes + /public/llms.txt
- Add canonical tags
- Add Organization/LocalBusiness JSON-LD
- Shorten <title> to ~60 chars
- Scaffold /features, /compare/booksy, /compare/vagaro, /guarantee, /locations/[city] route stubs
- Add google-site-verification meta placeholder
- Add alt text to dashboard image

**Section G (P2 — Technical/Security):**
- Harden /api/public/lead (CORS, honeypot, rate limit, stop logging PII)
- Wire lead delivery (needs destination + API key)
- Add security headers
- Wire analytics or remove track()
- Add root README
- Prune unused shadcn components
- Pin nitro+vite to stable
- Add smoke test for lead Zod schema

### Out of Scope

- Nothing from the fix list sections A–G is out of scope
- No backend/database changes beyond the lead-capture API
- No new features beyond what the fix list specifies

## Technical Constraints

- TanStack Start (React 19, SSR) + Tailwind v4 + Vite 8 + Cloudflare
- File-based routing in `src/routes/`
- No database — this is a marketing site
- Secrets go in Cloudflare environment variables, never in code
- TypeScript strict mode
- No force-push, rebase, or amend of published commits
- Must run `bunx tsc --noEmit` + `bun run build` before each commit
- Small, focused commits per section

## Technology Stack

- **Frontend:** TanStack Start (React 19, SSR) + Tailwind v4 + Vite 8
- **Backend:** TanStack Start API routes (server handlers)
- **Infrastructure:** Cloudflare (via Lovable)
- **Payments:** Polar.sh
- **Package Manager:** Bun

## Dependencies

- `salon-suite-website-fixes.md` — source-of-truth task list (needs to be dropped into repo root)
- **User-provided inputs needed (blocking some sections):**
  1. Two Polar checkout links (DIY $797, DFY $5,797)
  2. Lead destination (email/CRM)
  3. Production domain
  4. OG image (1200×630 PNG)
  5. Founder block content (name, credential, photo, links, story)
  6. Testimonials decision
  7. Scarcity/urgency truth
  8. Claims confirmation (POS/SMS/migration → roadmap vs reality)
  9. Analytics choice (ID to wire, or remove)
  10. Google Search Console token (optional)

## Configuration

- Stack: auto-detect (TanStack Start)
- API Style: rest
- Complexity: medium
