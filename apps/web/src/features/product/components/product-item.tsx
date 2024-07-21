// @@filename: apps/web/turbo/generators/plop-templates/item.tsx.hbs

import React from "react";
import { useProducts } from "../context/product-context";

export const ProductItem: React.FC<{ productId: string }> = ({ productId }) => {
  const { useProductQuery, updateProduct, deleteProduct } = useProducts();
  const { data: product, isLoading, error } = useProductQuery(productId);

  if (isLoading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return null;

  return (
    <div>
      <h2>{product.id}</h2>
      <button
        onClick={() =>
          updateProduct({ id: product.id /* Add properties to update */ })
        }
      >
        Update product
      </button>
      <button onClick={() => deleteProduct(product.id)}>Delete product</button>
    </div>
  );
};
