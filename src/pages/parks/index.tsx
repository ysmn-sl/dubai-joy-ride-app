// src/pages/parks.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import React, { useEffect, useState } from "react";
import "../../styles/globals.css";
import { Park } from "@/types/park";

const ParkListPage: React.FC = () => {
  const [parks, setParks] = useState<Park[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/theme-parks.json");
        const data = await response.json();
        setParks(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Theme Parks in Dubai</h1>
        {parks && <ProductList products={parks} />}
      </div>
      <Footer />
    </>
  );
};

export default ParkListPage;
