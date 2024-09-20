import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { useCart } from "@/context/CartContext";

const OrderSuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [orderDetails, setOrderDetails] =
    useState<Stripe.Checkout.Session | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (session_id) {
        const res = await fetch(
          `/api/get-checkout-session?session_id=${session_id}`
        );
        const data = await res.json();
        setOrderDetails(data);
      }
    };
    fetchOrderDetails();
  }, [session_id]);

  // Handle success modal
  useEffect(() => {
    if (session_id) {
      clearCart(); // Clear the cart after successful payment
    }
  }, [session_id, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🎉 Order Successful!
        </h1>
        {orderDetails ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Order Details:
            </h2>
            {orderDetails.line_items &&
            orderDetails.line_items.data.length > 0 ? (
              <ul className="list-disc list-inside mb-6">
                {orderDetails.line_items.data.map((item: any) => (
                  <li key={item.id} className="py-2 text-gray-600">
                    <span className="font-semibold">
                      {item.quantity} x {item.description}
                    </span>{" "}
                    -
                    <span className="font-bold">{` ${
                      item.amount_total / 100
                    } AED`}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No items in the order.</p>
            )}
            <button
              className="mt-4 w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => {
                router.push("/");
              }}
            >
              Return to Home
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
