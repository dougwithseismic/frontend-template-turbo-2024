// @@filename: apps/web/turbo/generators/plop-templates/list.tsx.hbs

import React from "react";
import { useProducts } from "../context/product-context";
import { ProductItem } from "./product-item";

export const ProductList: React.FC = () => {
  const { products, isLoading, error, createProduct } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button
        onClick={() =>
          createProduct({
            /* Add necessary properties */
          })
        }
      >
        Add Product
      </button>
      {products.map((product) => (
        <ProductItem key={product.id} productId={product.id} />
      ))}
    </div>
  );
};
