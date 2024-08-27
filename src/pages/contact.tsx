// src/pages/contact.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "@/components/Button";

const ContactPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          If you have any questions or need assistance, feel free to reach out
          to us.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Name"
          />
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Email"
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Your Message"
          ></textarea>
          <Button variant="primary" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
