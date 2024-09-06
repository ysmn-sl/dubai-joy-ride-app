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
          <div className="flex items-center justify-between">
            <p className=" text-sm text-gray-400 font-light">
              {product.category}
            </p>
            <div className="flex items-center text-blue-600">
              <i className="fas fa-solid fa-star font-md  "></i>
              <p className="font-sm font-semibold"> {product.rating}</p>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-2 text-gray-700  line-clamp-1 ">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2 min-h-[2rem] ">
            {product.description}
          </p>
          <div className="flex items-center text-gray-600 mb-1 text-sm font-extralight">
            <i className="fas fa-regular fa-location-dot text-gray-500 mr-2 "></i>
            <p className="">{product.location}</p>
          </div>
        </div>
        <div className=" flex flex-col px-4 py-2 border-t ">
          <p className=" text-gray-600 font-thin text-xs"> From</p>
          <p className="text-red-600 text-xl font-semibold">
            {product.currency} {product.basePrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
