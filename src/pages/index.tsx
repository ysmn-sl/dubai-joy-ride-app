"use client";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/productService";

const HomePage: React.FC = () => {
  const [parks, setParks] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        const data = response.data;
        if (response.status === 200) {
          setParks(data);
        } else {
          console.log("Failed to fetch data");
        }
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
      <Hero />
      <div className="container mx-auto px-4 py-8 font-poppins">
        {parks && <ProductList products={parks} />}
      </div>
    </>
  );
};

export default HomePage;
