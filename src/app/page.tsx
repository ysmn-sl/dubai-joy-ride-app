"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { Park } from "@/types/park";

const HomePage: React.FC = () => {
  const [parks, setParks] = useState<Park[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data/theme-parks.json");
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
      <Hero />
      <div className="container mx-auto px-4 py-8">
        {parks && <ProductList products={parks} />}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
