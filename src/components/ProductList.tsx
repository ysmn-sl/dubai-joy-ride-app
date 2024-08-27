// src/components/ProductList.tsx
import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow rounded-lg p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <Link
            href={`/parks/${product.id}`}
            className="text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
