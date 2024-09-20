// pages/cart.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/outline";

// Load Stripe instance with your public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { canceled } = router.query;
  const [setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    updateCartItemQuantity(itemId, quantity);
  };

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

  const handleCloseModal = () => {
    setShowFailureModal(false);
  };

  // Handle failure modal
  useEffect(() => {
    if (canceled) {
      setShowFailureModal(true);
    }
  }, [canceled, router]);

  return (
    <>
      <Navbar />
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-32">
          <i className="fa fa-solid fa-basket-shopping  fa-3x text-gray-400"></i>
          <h1 className="mt-6 text-xl font-semibold text-gray-700">
            Your cart is empty
          </h1>
          <p className="mt-2 text-gray-500 text-center">
            Looks like you haven&#39;t added anything to your cart yet.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none"
            onClick={() => {
              router.push("/parks");
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <p className="px-6 font-extralight text-gray-800 mt-12 pt-14 mb-2">
            My Basket ({cartItems.length} items)
          </p>

          <div className="flex flex-col lg:flex-row px-4 py-2">
            <div className="flex-1 flex-col flex-grow">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="relative flex w-full pb-4 mb-4 rounded-md shadow border border-gray-70"
                >
                  {/* Image Column */}
                  <div className="flex-initial p-4">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={128}
                      height={90}
                      className="w-[128px] h-[90px] object-cover rounded-sm md:w-[182px] md:h-[121px]"
                    />
                  </div>

                  {/* Description Column */}
                  <div className="flex-grow p-4 flex  md:flex-col relative">
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-2 md:mb-0">
                      <div className="flex flex-col">
                        <a
                          href={`/parks/${item.product.id}`}
                          className="text-lg font-semibold text-gray-800"
                        >
                          {item.product.name}
                        </a>

                        <div className="flex items-center text-gray-500 mt-2  text-sm lg:text-lg">
                          <i className="fas fa-ticket mr-2"></i>
                          <p> {item.ticket.type}</p>
                        </div>

                        <div className="flex items-center text-gray-500 mt-2 text-sm lg:text-lg">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          <p>
                            {item.date.day} {item.date.date}
                          </p>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="flex items-center px-2 py-4">
                        <div className="flex items-center border border-gray-200 rounded px-4 mr-2">
                          <span className="text-gray-800 mr-1 text-sm lg:text-lg">
                            Qty
                          </span>
                          <div className="relative">
                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="appearance-none bg-transparent focus:outline-none pr-6 text-sm lg:text-lg"
                            >
                              {Array.from({ length: 4 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                              <i className="fas fa-chevron-down text-gray-700"></i>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm lg:text-lg font-semibold text-gray-800 md:ml-4">
                          AED {item.totalPrice}
                        </p>
                      </div>
                    </div>
                    <button
                      className="absolute text-xl px-4 bottom-0 right-0 text-blue-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

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
                <div className="grid grid-cols-4 mt-4 gap-2 px-6">
                  <div className="flex items-center justify-center h-12">
                    <img
                      src="/images/payment method/master.svg"
                      alt="Payment Method 1"
                      className="h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <img
                      src="/images/payment method/pay.svg"
                      alt="Payment Method 2"
                      className="h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <img
                      src="/images/payment method/stripe.png"
                      alt="Payment Method 3"
                      className="h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <img
                      src="/images/payment method/visa.svg"
                      alt="Payment Method 4"
                      className="h-full object-contain rounded-lg"
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <p className="text-red-500 text-lg font-semibold">
              Payment failed or canceled.
            </p>
            <p>Please try again or use a different payment method.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleCloseModal}
            >
              ok
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CartPage;
