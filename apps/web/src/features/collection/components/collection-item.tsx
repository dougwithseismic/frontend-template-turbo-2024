import React from 'react';
import { useCollections } from '../context/collection-context';

export const CollectionItem: React.FC<{ collectionId: string }> = ({ collectionId }) => {
  const { useCollectionQuery, updateCollection, deleteCollection } = useCollections();


  return (
    <div>
      {/* Display collection properties here */}
    </div>
  );
};