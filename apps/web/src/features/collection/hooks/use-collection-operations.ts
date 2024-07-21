import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { collectionApi } from "../api/collection-api";
import { Collection, NewCollection } from "../types";

export const useCollectionOperations = () => {
  const queryClient = useQueryClient();

  const collectionsQuery = useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: collectionApi.fetchCollections,
  });

  const useCollectionQuery = (id: string): UseQueryResult<Collection, Error> =>
    useQuery({
      queryKey: ["collection", id],
      queryFn: () => collectionApi.fetchCollection(id),
    });

  const createCollectionMutation = useMutation<
    Collection,
    Error,
    NewCollection
  >({
    mutationFn: collectionApi.createCollection,
    onSuccess: (newCollection) => {
      queryClient.setQueryData<Collection[]>(
        ["collections"],
        (oldCollections = []) => [...oldCollections, newCollection]
      );
    },
  });

  const updateCollectionMutation = useMutation<
    Collection,
    Error,
    Partial<Collection> & { id: string }
  >({
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

  const deleteCollectionMutation = useMutation<void, Error, string>({
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
