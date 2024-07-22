import React from "react";
import { Product } from "../types";

interface ProductItemProps {
  product: Product;
  onUpdate?: (updates: Partial<Product>) => void;
  onDelete?: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-100 text-neutral-600">
      <h3>{product.name}</h3>
      {onUpdate && (
        <button onClick={() => onUpdate({ name: `Updated ${product.name}` })}>Update</button>
      )}
      {onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};
