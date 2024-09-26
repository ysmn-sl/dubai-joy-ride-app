import ProductList from "@/components/ProductList";
import React, { useEffect, useState } from "react";
import "@/lib/productService";
import "../../styles/globals.css";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { getProductByCategory } from "@/lib/productService";

const CategoryPage: React.FC = () => {
  const [parks, setParks] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { categoryName } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (categoryName) {
          const response = await getProductByCategory(categoryName.toString());
          if (response.status === 200) {
            setParks(response.data);
          } else {
            setError("Failed to fetch data");
          }
        } else {
          setError("Category categoryName is missing");
        }
      } catch (error: any) {
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setLoading(false);
    };
  }, [categoryName]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
        {parks && <ProductList products={parks} />}
      </div>
    </>
  );
};

export default CategoryPage;
