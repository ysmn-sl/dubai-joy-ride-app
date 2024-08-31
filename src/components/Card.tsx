// src/components/Card.tsx
import { Product } from "@/types/product";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card: React.FC<Product> = (product) => {
  return (
    <Link href={`/parks/${product.id}`}>
      <div className="w-full rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        ></Image>
        <div className="p-4 flex flex-col flex-1 bg-white">
          <h2 className="text-xl font-bold mb-2 text-gray-800  line-clamp-1 ">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4  line-clamp-2 min-h-[2rem] ">
            {product.description}
          </p>
          <div className="flex items-center text-gray-600 mb-1">
            <i className="fas fa-regular fa-location-dot text-gray-500 mr-2"></i>
            <p>{product.location}</p>
          </div>

          <div className="absolute bottom-4 right-4">
            <p className="text-red-600 text-xl font-semibold">
              {product.currency} {product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
