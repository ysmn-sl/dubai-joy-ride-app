import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { session_id } = req.query;

    try {
      const session = await stripe.checkout.sessions.retrieve(
        session_id as string,
        {
          expand: ["line_items"],
        }
      );
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
