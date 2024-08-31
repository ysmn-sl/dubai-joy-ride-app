import React from "react";
import { Product } from "@/types/product";
import Card from "./Card";

interface ProductListProps<T extends Product> {
  products: T[];
}

const ProductList = <T extends Product>({ products }: ProductListProps<T>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} {...product}></Card>
      ))}
    </div>
  );
};

export default ProductList;
