// src/pages/cart.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const CartPage: React.FC = () => {
  const cartItems = [
    {
      id: 1,
      title: "Adult Ticket - Dubai Theme Park 1",
      image:
        "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Fri, Oct 18, 2024",
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: "Adult Ticket - Dubai Theme Park 1",
      image:
        "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Fri, Oct 18, 2024",
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: "Adult Ticket - Dubai Theme Park 1",
      image:
        "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Fri, Oct 18, 2024",
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: "Adult Ticket - Dubai Theme Park 1",
      image:
        "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Fri, Oct 18, 2024",
      price: 100,
      quantity: 1,
    },
    // Add more items here
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <p className="px-6 font-extralight text-gray-800 mt-4 mb-2">
        My Basket ( 4 items )
      </p>
      <div className="flex flex-col md:flex-row px-4 py-2">
        {/* Products section */}

        <div className="flex-1 flex-col flex-grow">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="relative flex w-full h-[26vh] pb-4 mb-4 rounded-md shadow border border-gray-70"
            >
              {/* Image Column */}

              <div className="flex-initial p-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={128}
                  height={90}
                  className="w-[128px] h-[90px] object-cover rounded-sm md:w-[182px] md:h-[121px]"
                />
              </div>
              {/* Description Column */}
              <div className="flex-grow p-4 flex flex-col md:flex-col relative">
                {/* Description Part 1 */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-2 md:mb-0">
                  <div className="flex flex-col">
                    <a
                      href={`/parks/${product.id}`}
                      className="text-lg font-semibold text-gray-800"
                    >
                      {product.title}
                    </a>

                    <div className="flex items-center text-gray-500 mt-2">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      <p>{product.date}</p>
                    </div>
                  </div>
                  {/* Total Amount */}
                  <div className="flex items-center px-2 py-4">
                    <div className="flex items-center border border-gray-200 rounded px-4 mr-2">
                      <span className="text-gray-800 mr-1 text-sm lg:text-lg">
                        Qty
                      </span>
                      <div className="relative">
                        <select className="appearance-none bg-transparent focus:outline-none pr-6 text-sm lg:text-lg">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <i className="fas fa-chevron-down text-gray-700"></i>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm lg:text-lg font-semibold text-gray-800 md:ml-4">
                      AED {product.price}
                    </p>
                  </div>
                </div>
                <button className="absolute text-xl px-4 bottom-0 right-0 text-blue-600">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout section */}
        <div className="flex-non w-full md:w-1/3 md:sticky md:top-4 md:ml-6 sm:ml-0 md:self-start">
          <div className="bg-gray-50 rounded-2xl px-8 py-4 shadow-lg border border-gray-50">
            <p className="text-sm md:text-lg font-semibold text-gray-800 mb-2">
              Discount Code
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your discount code"
                className="w-full px-3 py-2 border rounded-l-lg"
              />
              <button className="px-4 bg-blue-600 text-white rounded-r-lg">
                Apply
              </button>
            </div>

            <p className="text-sm md:text-lg font-semibold mb-2 mt-4">
              Order Summary
            </p>
            <p className="py-2 border-b text-gray-600">
              Subtotal: AED subtotal
            </p>
            <p className="py-2 border-b text-red-400">Discount: AED discount</p>
            <p className="text-sm md:text-lg mt-2">Order Total: AED {total}</p>
            <button className="p-2 w-full mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>

          <div className="shadow-lg rounded-2xl p-6 mt-6 bg-blue-50 hidden md:block border border-blue-50">
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
                  src="/images/payment method/tamaraLogo.avif"
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
      <Footer />
    </>
  );
};

export default CartPage;
