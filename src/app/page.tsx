// src/pages/index.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const products = [
    {
      id: 1,
      image: "/path/to/image1.jpg",
      title: "Product 1",
      description: "Description of Product 1",
    },
    {
      id: 2,
      image: "/path/to/image2.jpg",
      title: "Product 2",
      description: "Description of Product 2",
    },
    // Add more products as needed
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ProductList products={products} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
