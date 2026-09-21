import type { NextApiRequest, NextApiResponse } from "next";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

function getRequestOrigin(req: NextApiRequest): string {
  // 1. Direct origin header
  if (req.headers.origin && typeof req.headers.origin === "string") {
    return req.headers.origin;
  }
  // 2. Referer header
  if (req.headers.referer && typeof req.headers.referer === "string") {
    try {
      const url = new URL(req.headers.referer);
      return url.origin;
    } catch {}
  }
  // 3. Host / X-Forwarded-Host header
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (host && typeof host === "string") {
    const proto = (req.headers["x-forwarded-proto"] as string) || "http";
    return `${proto}://${host}`;
  }
  // 4. Fallback from environment
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only." });

  const { phoneNumber } = req.body as { phoneNumber?: string };
  if (!phoneNumber) return res.status(400).json({ error: "Phone number is required." });

  const origin = getRequestOrigin(req);
  const paymentLink = process.env.STRIPE_PAYMENT_LINK || process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  // Option A: Direct Stripe Payment Link configured (e.g. https://buy.stripe.com/...)
  if (paymentLink && paymentLink.startsWith("https://buy.stripe.com")) {
    const separator = paymentLink.includes("?") ? "&" : "?";
    const targetUrl = `${paymentLink}${separator}client_reference_id=${encodeURIComponent(phoneNumber)}`;
    return res.status(200).json({ url: targetUrl, demo: false });
  }

  // Option B: Real Stripe API configured
  if (isStripeConfigured()) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "PhoneLocating – 2M Forensic Phone Dossier",
                description: `One-time unlock for phone number ${phoneNumber} (2M satellite aerial optics, exact GPS & HLR telemetry)`,
              },
              unit_amount: 999, // $9.99 USD
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&phone=${encodeURIComponent(phoneNumber)}`,
        cancel_url: `${origin}/cancel?phone=${encodeURIComponent(phoneNumber)}`,
        metadata: { phone: phoneNumber },
      });
      return res.status(200).json({ url: session.url, demo: false });
    } catch (error) {
      console.error("Stripe checkout session creation failed:", error);
      // If Stripe API key fails (e.g. invalid test key or network issue), provide sandbox fallback so user is not stuck
      const demoSessionId = `demo_session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      return res.status(200).json({
        url: `${origin}/success?session_id=${demoSessionId}&phone=${encodeURIComponent(phoneNumber)}`,
        demo: true,
        notice: `Stripe API error (${error instanceof Error ? error.message : "Unknown"}). Falling back to Sandbox simulation.`,
      });
    }
  }

  // Option C: Sandbox / Demo simulation mode (when Stripe keys are placeholders)
  const demoSessionId = `demo_session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return res.status(200).json({
    url: `${origin}/success?session_id=${demoSessionId}&phone=${encodeURIComponent(phoneNumber)}`,
    demo: true,
    notice: "STRIPE_SECRET_KEY is using a placeholder. Redirecting via Sandbox Simulation.",
  });
}
