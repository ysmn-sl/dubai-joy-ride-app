// src/pages/about.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          We are dedicated to bringing you the best experiences in Dubai. From
          thrilling theme parks to cultural adventures, we make it easy to book
          and explore.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
