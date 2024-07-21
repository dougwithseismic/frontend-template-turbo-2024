// @@filename: packages/tools/plop-templates/item.tsx.hbs

import React from "react";
import { useCollections } from "../context/collection-context";

export const CollectionItem: React.FC<{ collectionId: string }> = ({
  collectionId,
}) => {
  const { useCollectionQuery, updateCollection, deleteCollection } =
    useCollections();

  const {
    data: collection,
    isLoading,
    error,
  } = useCollectionQuery(collectionId);

  if (isLoading) return <div>Loading collection...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!collection) return null;

  return (
    <div>
      <h2>{collection.id}</h2>
      <button
        onClick={() =>
          updateCollection({ id: collection.id /* Add properties to update */ })
        }
      >
        Update collection
      </button>
      <button onClick={() => deleteCollection(collection.id)}>
        Delete collection
      </button>
    </div>
  );
};
