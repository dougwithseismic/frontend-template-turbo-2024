import React, { createContext, useContext } from "react";
import { useProductOperations } from "../hooks/use-product-operations";

export const ProductContext = createContext<ReturnType<typeof useProductOperations> | undefined>(
  undefined,
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const productOperations = useProductOperations();
  return <ProductContext.Provider value={productOperations}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
