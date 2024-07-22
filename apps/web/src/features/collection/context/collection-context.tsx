import React, { createContext, useContext } from "react";
import { useCollectionOperations } from "../hooks/use-collection-operations";

const CollectionContext = createContext<ReturnType<typeof useCollectionOperations> | undefined>(
  undefined,
);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const collectionOperations = useCollectionOperations();
  return (
    <CollectionContext.Provider value={collectionOperations}>{children}</CollectionContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionProvider");
  }
  return context;
};
