// src/pages/parks.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import React from "react";
import "../../styles/globals.css";

const ParkListPage: React.FC = () => {
  const parks = [
    {
      id: 1,
      image: "/images/park1.jpg",
      title: "Dubai Theme Park 1",
      description: "Family fun and adventure",
    },
    {
      id: 2,
      image: "/images/park2.jpg",
      title: "Dubai Theme Park 2",
      description: "Rides for all ages",
    },
    // More parks here
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Theme Parks in Dubai</h1>
        <ProductList products={parks} />
      </div>
      <Footer />
    </>
  );
};

export default ParkListPage;
