import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collectionApi } from "../api/collection-api";
import { Collection } from "../types";

export const useCollectionOperations = () => {
  const queryClient = useQueryClient();

  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: collectionApi.fetchCollections,
  });

  const useCollectionQuery = (id: string) =>
    useQuery({
      queryKey: ["collection", id],
      queryFn: () => collectionApi.fetchCollection(id),
    });

  const createCollectionMutation = useMutation({
    mutationFn: collectionApi.createCollection,
    onSuccess: (newCollection) => {
      queryClient.setQueryData<Collection[]>(
        ["collections"],
        (oldCollections = []) => [...oldCollections, newCollection]
      );
    },
  });

  const updateCollectionMutation = useMutation({
    mutationFn: collectionApi.updateCollection,
    onSuccess: (updatedCollection) => {
      queryClient.setQueryData<Collection>(
        ["collection", updatedCollection.id],
        updatedCollection
      );
      queryClient.setQueryData<Collection[]>(
        ["collections"],
        (oldCollections = []) =>
          oldCollections.map((collection) =>
            collection.id === updatedCollection.id
              ? updatedCollection
              : collection
          )
      );
    },
  });

  const deleteCollectionMutation = useMutation({
    mutationFn: collectionApi.deleteCollection,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["collection", deletedId] });
      queryClient.setQueryData<Collection[]>(
        ["collections"],
        (oldCollections = []) =>
          oldCollections.filter((collection) => collection.id !== deletedId)
      );
    },
  });

  return {
    collections: collectionsQuery.data ?? [],
    isLoading: collectionsQuery.isLoading,
    error: collectionsQuery.error,
    useCollectionQuery,
    createCollection: createCollectionMutation.mutate,
    updateCollection: updateCollectionMutation.mutate,
    deleteCollection: deleteCollectionMutation.mutate,
  };
};
