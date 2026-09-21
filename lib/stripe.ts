import Stripe from "stripe";

export function isStripeConfigured(): boolean {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return Boolean(secretKey && !secretKey.includes("YOUR") && secretKey.startsWith("sk_"));
}

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("YOUR")) {
    throw new Error("STRIPE_SECRET_KEY is not configured in .env.local.");
  }
  return new Stripe(secretKey);
}
