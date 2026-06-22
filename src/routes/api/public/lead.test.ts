import { describe, it, expect } from "vitest";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  salonUrl: z.string().trim().max(255).optional().default(""),
  startDate: z.string().trim().max(40).optional().default(""),
  source: z.string().trim().max(80).optional().default("landing"),
  website: z.string().max(0).optional().default(""),
});

describe("LeadSchema", () => {
  it("accepts a minimal valid lead", () => {
    const result = LeadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("landing");
      expect(result.data.salonUrl).toBe("");
    }
  });

  it("accepts a full valid lead", () => {
    const result = LeadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      salonUrl: "https://janes-salon.com",
      startDate: "ASAP",
      source: "homepage-hero",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = LeadSchema.safeParse({
      name: "",
      email: "jane@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = LeadSchema.safeParse({
      name: "Jane Doe",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name that is only whitespace", () => {
    const result = LeadSchema.safeParse({
      name: "   ",
      email: "jane@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name over 120 characters", () => {
    const result = LeadSchema.safeParse({
      name: "J".repeat(121),
      email: "jane@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("accepts honeypot field being empty", () => {
    const result = LeadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects honeypot field being non-empty", () => {
    const result = LeadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      website: "http://spam.com",
    });
    expect(result.success).toBe(false);
  });
});
