// src/pages/parks.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import React, { useEffect, useState } from "react";
import "@/lib/productService";
import "../../styles/globals.css";
import { getAllProducts } from "@/lib/productService";
import { Product } from "@/types/product";

const ParkListPage: React.FC = () => {
  const [parks, setParks] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          setParks(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
