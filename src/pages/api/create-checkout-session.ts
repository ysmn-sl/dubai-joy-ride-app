// pages/api/create-checkout-session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { cartItems } = req.body;

      // Create a payment session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((item: any) => ({
          price_data: {
            currency: "aed",
            product_data: {
              name: item.product.name,
            },
            unit_amount: Math.round(item.totalPrice * 100), // Convert to cents (fils)
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/orderSuccess?session_id={CHECKOUT_SESSION_ID}`, // Redirect to this page after success
        cancel_url: `${req.headers.origin}/cart?canceled=true`, // Redirect to this page if canceled
      });

      // Return sessionId to frontend
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: "Failed to create session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
