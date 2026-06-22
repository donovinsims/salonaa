import { createFileRoute } from "@tanstack/react-router";

// Production domain: nailsuite.vercel.app
const SITE_URL = "https://nailsuite.vercel.app";

export const Route = createFileRoute("/robots/txt")({
  server: {
    handlers: {
      GET: async () => {
        const txt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
        return new Response(txt, {
          status: 200,
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});
