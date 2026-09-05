import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only." });
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please complete all fields correctly." });
  }
  console.info("Contact request", { name, email, message });
  return res.status(200).json({ message: "Thanks. Your message was accepted by the mock endpoint." });
}
