import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// TODO: Replace with actual production domain
const ALLOWED_ORIGIN = "https://nailsuite.vercel.app";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  salonUrl: z.string().trim().max(255).optional().default(""),
  startDate: z.string().trim().max(40).optional().default(""),
  source: z.string().trim().max(80).optional().default("landing"),
  // Honeypot: hidden field bots fill in — must be empty for real submissions
  website: z.string().max(0).optional().default(""),
});

// Simple in-memory rate limit: max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // CORS check
        const origin = request.headers.get("origin") ?? "";
        if (origin && origin !== ALLOWED_ORIGIN) {
          return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
        }

        // Rate limit by IP
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (!checkRateLimit(ip)) {
          return Response.json({ ok: false, error: "too_many_requests" }, { status: 429 });
        }

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

        // Honeypot check
        if (parsed.data.website) {
          // Bot filled the honeypot — silently accept to not tip off bots
          return Response.json({ ok: true });
        }

        const lead = {
          ...parsed.data,
          receivedAt: new Date().toISOString(),
          ua: request.headers.get("user-agent") ?? "",
        };

        // Log with redacted email for debugging (full email still available
        // via structured logging / downstream delivery)
        const redacted = {
          ...lead,
          email: lead.email.replace(/(?<=^.{3}).*(?=@)/, "***"),
        };
        // eslint-disable-next-line no-console
        console.log("[LEAD]", JSON.stringify(redacted));

        // Notify via Sequenzy transactional email API
        const SEQUENZY_API_KEY = process.env.SEQUENZY_API_KEY ?? "";
        const sendPayload = {
          to: "nailsuite@clockout.us",
          subject: `New NailSuite Lead: ${lead.name}`,
          body: `<h2>New Lead</h2><pre>${JSON.stringify(lead, null, 2)}</pre>`,
          preview: "New lead from NailSuite",
          from: "NailSuite <nailsuite@clockout.us>",
        };

        try {
          const seqRes = await fetch(
            "https://api.sequenzy.com/api/v1/transactional/send",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${SEQUENZY_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendPayload),
            },
          );
          if (!seqRes.ok) {
            const errBody = await seqRes.text();
            // eslint-disable-next-line no-console
            console.error("[LEAD] Sequenzy send failed", seqRes.status, errBody);
          }
        } catch (seqErr) {
          // eslint-disable-next-line no-console
          console.error("[LEAD] Sequenzy request error", seqErr);
        }

        return Response.json(
          { ok: true },
          {
            headers: {
              "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "86400",
            },
          },
        );
      },
      OPTIONS: async ({ request }) => {
        const origin = request.headers.get("origin") ?? "";
        const corsOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : "null";
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": corsOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
          },
        });
      },
    },
  },
});
