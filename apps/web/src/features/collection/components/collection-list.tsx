import React from 'react';
import { useCollections } from '../context/collection-context';
import { CollectionItem } from './collection-item';

export const CollectionList: React.FC = () => {
  const { collections, isLoading, error, createCollection } = useCollections();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => createCollection({ /* Add necessary properties */ })}>Add Collection</button>
    </div>
  );
};