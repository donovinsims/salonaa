# Doc 2 — Polar.sh Product Setup (copy/paste)

## Setup overview

Polar.sh is a **Merchant of Record** — it runs checkout and handles sales tax/VAT for you, which is ideal for a brand-new business selling a digital product across states. You'll create **two one-time products**, attach **benefits** (how the buyer receives what they paid for), grab each product's **Checkout Link**, and paste those links into the site (replacing the `mailto:` buttons).

**Order of operations in Polar:**
1. Create your organization (your storefront slug becomes part of links, e.g. `polar.sh/your-slug`). Connect your payout (Stripe/bank) and fill in business details so MoR/tax works.
2. Build the two products below (copy/paste the names, descriptions, prices).
3. Attach **Benefits** to each (license key / file download / GitHub access / custom) so fulfillment is automatic.
4. Copy each product's **Checkout Link** and a **Customer Portal** link.
5. Build in **Sandbox** first, test a full purchase, then switch to production.
6. Paste the two checkout links into Doc 1's prompt (the agent wires them into the site).

> Note: Polar's exact menu labels can shift — use the *generated* Checkout Link from each product page rather than hand-typing a URL. Everything below is the content to paste; the dashboard clicks are light.

**Honesty:** descriptions below describe only what's actually delivered (booking site, Stripe deposits, SMS confirmations, commission CSV, dashboard, walk-in checkout; migration = CSV-assisted). Keep card-reader POS / SMS reminders / AI out of the deliverables.

## Product 1 — DIY License ($797)

**Product name:** `Salon Independence Kit — DIY License`
**Type:** One-time purchase · **Price:** `$797 USD`
**Slug/permalink:** `salon-independence-kit-diy`
**Tax category:** Digital goods / software (Polar handles MoR).

**Short description (paste):**
> Own your salon's booking site, client list, and payments — for a one-time $797. The complete Salon Suite codebase, licensed for one location. Most owners are live in an afternoon. Backed by the 60-Day Salon Savings Guarantee.

**Long description (paste):**
> **Stop renting your salon back from Booksy.** The Salon Independence Kit is the full Salon Suite codebase — a booking website, owner dashboard, real-time floor board, walk-in checkout, and per-stylist commission tracking — that you own outright and run on your own domain, your own Stripe, and your own database. No subscriptions, no per-staff seats, no per-booking cut.
>
> **What you get (one-time $797):**
> • Full booking website on your own domain — services, gallery, gift cards, online deposits ($2,500 value)
> • Owner dashboard + real-time floor board ($2,000 value)
> • Walk-in checkout from the dashboard via Stripe ($1,200 value)
> • Per-stylist commission tracking with CSV export at payday ($800 value)
> • Automated SMS booking confirmations + 12 months of updates ($600 value)
>
> **Bonuses included:**
> • The Booksy Escape Kit — step-by-step migration playbook ($497)
> • Salon Marketing Playbook — 50 SMS + email templates ($397)
> • Booksy CSV Import Call — 30 min, we import your client list together ($197)
> • Gift Card Module ($297)
>
> **60-Day Salon Savings Guarantee:** if you've gone live and haven't saved at least $1,000 in fees within 60 days, we refund every cent.
>
> Requirements to install: a domain, a Stripe account, a Twilio account, and ~2–3 focused hours (plain-English runbook, no coding required).

**Benefits to attach (pick what matches how you deliver the code):**
- **License Key** benefit — issues a unique key per buyer (good for tracking single-location licenses; the codebase/runbook can check it).
- **GitHub Repository Access** benefit — auto-invites the buyer's GitHub username to a private template repo (cleanest delivery for code).
- **File Download** benefit — attach a versioned `.zip` of the codebase + the runbook PDF + the bonus files, as a fallback / alongside.
- (Optional) **Custom** benefit with a welcome note linking the runbook and a Cal.com onboarding link.

**Checkout success message (paste):**
> You're in — welcome to Salon Suite. Your license key and code access are in your email and in your Polar customer portal. Next step: book your free setup orientation at cal.com/donovin. — Donovin

## Product 2 — Done-For-You Setup ($5,797)

**Product name:** `Salon Independence Kit — Done-For-You Setup`
**Type:** One-time purchase · **Price:** `$5,797 USD` ($797 license + $5,000 deployment)
**Slug/permalink:** `salon-independence-kit-dfy`
**Optional:** add an installment option (e.g. 3 payments) if/when you enable Polar's payment plans — reduces friction at this price.

**Short description (paste):**
> We launch Salon Suite for you. You hand over your logo and a Stripe login; I customize the template, provision your database, configure payments and SMS confirmations, import your client list, and deploy to your domain — live in 5–10 business days. Includes everything in the DIY License.

**Long description (paste):**
> **The hands-off way to leave Booksy.** Everything in the DIY License, done for you by the founder:
> • Template customized to your brand & services
> • Private database provisioned & secured
> • Stripe online payments configured end-to-end
> • Automated SMS booking confirmations configured
> • Site deployed to your custom domain
> • Guided migration — we import your client list, services, and upcoming appointments from your Booksy/Vagaro CSV
> • 12 months of priority support
>
> **DFY bonuses:** Guided Migration Sprint ($997) · Staff training session, 60 min ($497) · Custom branding package ($2,500).
>
> Done-For-You is limited to a small number of onboardings per quarter so each launch gets personal attention.

**Benefit to attach:** a **Custom** benefit that delivers an onboarding checklist + a Cal.com kickoff scheduling link (this is a service, so fulfillment = scheduling the kickoff, not an instant download).

**Checkout success message (paste):**
> Thank you — your Done-For-You build is reserved. Book your kickoff call here: cal.com/donovin. I'll send the intake checklist (logo, Stripe access, service list) right after. — Donovin

> **Refund note (matches your /terms):** the 60-Day Savings Guarantee applies to the $797 license; DFY deployment fees are non-refundable once work has begun — state this on the checkout/description so it's clear up front.

## Price-lock, wiring & what you provide

**Make the "$797 → $997" urgency real (don't fake it):** the clean way in Polar is to **list the DIY price at $997** and create a **discount code** `FOUNDING` for −$200 (nets $797) with a **real expiration date**. The site copy then says "Founding price $797 through [date]" truthfully, and when the code expires the price is genuinely $997 — no dishonest countdown. (Alternative: list at $797 now and manually raise later.)

**Wire it into the site (Doc 1 handles the code):**
- Replace every `mailto:` Buy button with the product's **Checkout Link** (DIY link on the $797 buttons, DFY link on the $5,797 button).
- Set each product's **success/redirect URL** to a simple `/thank-you` page (or the Polar-hosted confirmation).
- Turn on **webhooks** (e.g. `order.created` / `benefit.granted`) if you want to trigger your own onboarding email or log the sale — also the honest source for a live "DFY spots remaining" counter.
- Link the **Customer Portal** in your footer so buyers can re-download/manage their license.

**What you provide to Polar (one-time setup):**
1. **Business + payout details** (so MoR/tax + payouts work) and your storefront slug.
2. **The actual deliverable for DIY:** a private GitHub template repo to grant access to, and/or a versioned `.zip` of the codebase + runbook PDF + bonus files to upload as the File Download benefit.
3. **License key policy** (single location per key) if you use the License Key benefit.
4. **The bonus files** (Booksy Escape Kit, marketing templates, gift-card module docs) uploaded as downloads.
5. **Sandbox test:** run one full test purchase end-to-end before going live.
6. After creating both products, **copy the two Checkout Links into Doc 1's prompt** — that's the single thing that unblocks the site's purchase flow.

**Tip ($100M Offers framing):** keep the on-site value stack and the Polar description in sync, and make sure the summed component value stays ~10× the price using only real deliverables — an honest anchor you can defend beats an inflated one.
