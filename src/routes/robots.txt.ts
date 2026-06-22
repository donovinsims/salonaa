import { createFileRoute } from "@tanstack/react-router";

// TODO: Replace example.com with the actual production domain
const SITE_URL = "https://example.com";

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
