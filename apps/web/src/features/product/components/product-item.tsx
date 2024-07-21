import React from "react";
import { useProducts } from "../context/product-context";

export const ProductItem: React.FC<{ productId: string }> = ({ productId }) => {
  const { useProductQuery, updateProduct, deleteProduct } = useProducts();

  return <div>{/* Display product properties here */}</div>;
};
