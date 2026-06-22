# Salon Suite — The Salon Independence Kit

A white-label nail-salon booking/POS codebase sold to salon owners. This repo is the marketing site (not the product codebase).

## Stack

- **Framework:** TanStack Start (React 19, SSR)
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** TanStack Router (file-based in `src/routes/`)
- **Deployment:** Vercel (via Lovable)

## Quick start

```sh
bun install
bun run dev      # development server
bun run build    # production build
bun run preview  # preview build
```

## Structure

```
src/
  routes/          # File-based routes (TanStack Router)
    api/public/    # API handlers (e.g., lead capture)
    compare/       # Competitor comparison pages
    locations/     # Location-specific pages
  components/
    ui/            # shadcn/ui components
  styles.css       # Global styles + Tailwind theme tokens
```

## Key conventions

See `AGENTS.md` for full details.
