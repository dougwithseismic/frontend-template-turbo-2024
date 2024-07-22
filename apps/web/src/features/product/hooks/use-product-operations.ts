import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { productApi } from "../api/product-api";
import { Product, NewProduct } from "../types";

export const useProductOperations = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productApi.fetchProducts,
  });

  const useProductQuery = (id: string): UseQueryResult<Product, Error> =>
    useQuery({
      queryKey: ["product", id],
      queryFn: () => productApi.fetchProduct(id),
    });

  const createProductMutation = useMutation<Product, Error, NewProduct>({
    mutationFn: productApi.createProduct,
    onSuccess: newProduct => {
      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) => [
        ...oldProducts,
        newProduct,
      ]);
    },
  });

  const updateProductMutation = useMutation<Product, Error, Partial<Product> & { id: string }>({
    mutationFn: productApi.updateProduct,
    onSuccess: updatedProduct => {
      queryClient.setQueryData<Product>(["product", updatedProduct.id], updatedProduct);
      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) =>
        oldProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product)),
      );
    },
  });

  const deleteProductMutation = useMutation<void, Error, string>({
    mutationFn: productApi.deleteProduct,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["product", deletedId] });
      queryClient.setQueryData<Product[]>(["products"], (oldProducts = []) =>
        oldProducts.filter(product => product.id !== deletedId),
      );
    },
  });

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    useProductQuery,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};
