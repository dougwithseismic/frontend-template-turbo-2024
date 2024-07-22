import React from "react";
import { ProductItem } from "./product-item";
import { Product } from "../types";

interface ProductListProps {
  isLoading: boolean;
  hasError: boolean;
  products: Product[];
  onUpdate?: (id: string, updates: Partial<Product>) => void;
  onDelete?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  isLoading,
  hasError,
  products,
  onUpdate,
  onDelete,
}) => {
  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: Failed to load products</div>;

  return (
    <div>
      {products.length === 0 && (
        <div>
          <p>No products found.</p>
          <p>Create a new product to get started.</p>
        </div>
      )}
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onUpdate={onUpdate ? updates => onUpdate(product.id, updates) : undefined}
          onDelete={onDelete ? () => onDelete(product.id) : undefined}
        />
      ))}
    </div>
  );
};
