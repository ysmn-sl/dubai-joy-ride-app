// pages/cart.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import EmptyCart from "@/components/EmptyCart";
import PaymentFailureModal from "@/components/PaymentFailureModal";
import CartItemCard from "@/components/CartItemCard";
import Image from "next/image";

// Load Stripe instance with your public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage: React.FC = () => {
  const { cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { canceled } = router.query;
  const [showFailureModal, setShowFailureModal] = useState<Boolean>(false);

  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      const { sessionId } = await response.json();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle failure modal
  useEffect(() => {
    if (canceled) {
      setShowFailureModal(true);
    }
  }, [canceled]);

  return (
    <>
      <Navbar />
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <p className="px-6 font-extralight text-gray-800 mt-12 pt-14 mb-2">
            My Basket ({cartItems.length} items)
          </p>

          {/* Cart Items */}
          <div className="flex flex-col lg:flex-row px-4 py-2">
            <div className="flex-1 flex-col flex-grow">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Checkout section */}
            <div className="flex-non w-full lg:w-1/3 md:sticky md:top-4 lg:ml-6 md:ml-0 md:self-start">
              <div className="bg-gray-50 rounded-2xl px-8 py-4 shadow-lg border border-gray-50">
                <p className="text-sm md:text-lg font-semibold text-gray-800 mb-2">
                  Discount Code
                </p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter your discount code"
                    className="w-full px-3 py-2 border border-r-0 rounded-l-lg"
                  />
                  <button className="px-4 bg-blue-600 text-white rounded-r-lg">
                    Apply
                  </button>
                </div>
                <p className="text-sm font-semibold mt-4">Order Summary</p>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="text-gray-500  ">AED {total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-b">
                  <p className="text-gray-500">Discount</p>
                  <p className="text-gray-500 "></p>
                </div>
                <div className="flex justify-between py-2 ">
                  <p className="text-gray-800 font-semibold">Total</p>
                  <p className="text-gray-800 font-semibold   ">
                    AED {total.toFixed(2)}
                  </p>
                </div>

                {/* Proceed to checkout button */}
                <button
                  className="p-2 w-full mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
              <div className="shadow-lg rounded-2xl p-6 mt-6 bg-blue-50 hidden lg:block border border-blue-50">
                <h2 className="text-sm md:text-lg font-semibold text-gray-800 mt-2">
                  Our Payment Methods
                </h2>
                <p>
                  You can pay on our secure website using any of the following
                  payment methods:
                </p>
                <div className="flex justify-center mt-4 px-4">
                  <div className="grid grid-cols-4 gap-4">
                    <Image
                      src="/images/payment method/master.svg"
                      alt="Payment Method 1"
                      className="h-full object-contain rounded-lg"
                      width={60}
                      height={60}
                    />
                    <Image
                      src="/images/payment method/pay.svg"
                      alt="Payment Method 2"
                      className="h-full object-contain rounded-lg"
                      width={60}
                      height={60}
                    />
                    <Image
                      src="/images/payment method/stripe.png"
                      alt="Payment Method 3"
                      className="h-full object-contain rounded-lg"
                      width={60}
                      height={60}
                    />
                    <Image
                      src="/images/payment method/visa.svg"
                      alt="Payment Method 4"
                      className="h-full object-contain rounded-lg"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Show payment failure message */}
      {showFailureModal && (
        <PaymentFailureModal setShowFailureModal={setShowFailureModal} />
      )}

      <Footer />
    </>
  );
};

export default CartPage;
