import { createFileRoute } from "@tanstack/react-router";

// TODO: Replace example.com with the actual production domain
const SITE_URL = "https://example.com";

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = [
          { loc: "", priority: "1.0", changefreq: "weekly" },
          { loc: "features", priority: "0.8", changefreq: "monthly" },
          { loc: "compare/booksy", priority: "0.7", changefreq: "monthly" },
          { loc: "compare/vagaro", priority: "0.7", changefreq: "monthly" },
          { loc: "guarantee", priority: "0.8", changefreq: "monthly" },
          { loc: "privacy", priority: "0.3", changefreq: "yearly" },
          { loc: "terms", priority: "0.3", changefreq: "yearly" },
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}/${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});
