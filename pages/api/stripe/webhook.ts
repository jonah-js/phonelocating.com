import type { NextApiRequest, NextApiResponse } from "next";
import { saveLicense } from "@/lib/license-store";
import { getStripe } from "@/lib/stripe";
import { createLicenseToken, verifyLicenseToken } from "@/utils/license";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: NextApiRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only." });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"];
  if (!webhookSecret || !signature) return res.status(400).json({ error: "Webhook signature is missing." });

  try {
    const stripe = getStripe();
    const rawBody = await buffer(req);
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const phoneNumber = session.metadata?.phone || "unknown";
      const token = createLicenseToken({ phoneNumber, sessionId: session.id });
      const payload = verifyLicenseToken(token);
      if (payload) await saveLicense({ ...payload, token });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Webhook validation failed." });
  }
}
