// src/pages/cart.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import router from "next/router";

const CartPage: React.FC = () => {
  const cartItems = [
    {
      id: 1,
      title: "Adult Ticket - Dubai Theme Park 1",
      price: 100,
      quantity: 2,
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
              <p className="text-gray-700">${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Total</h3>
            <p className="text-xl font-bold">${total}</p>
          </div>
        </div>
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
