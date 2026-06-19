import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  salonUrl: z.string().trim().max(255).optional().default(""),
  startDate: z.string().trim().max(40).optional().default(""),
  source: z.string().trim().max(80).optional().default("landing"),
});

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }
        const parsed = LeadSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "invalid_input", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }
        // Lead lands here. Visible in server logs immediately. Wire an email
        // provider (Resend, Brevo, Lovable Emails) in this handler to deliver
        // straight to inbox.
        const lead = {
          ...parsed.data,
          receivedAt: new Date().toISOString(),
          ua: request.headers.get("user-agent") ?? "",
        };
        // eslint-disable-next-line no-console
        console.log("[LEAD]", JSON.stringify(lead));
        return Response.json({ ok: true });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
    },
  },
});