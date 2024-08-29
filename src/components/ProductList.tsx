import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductListProps<T extends Product> {
  products: T[];
}

const ProductList = <T extends Product>({ products }: ProductListProps<T>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow rounded-lg p-4">
          <div>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 mb-4 rounded" />
            )}
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <Link
              href={`/parks/${product.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
