
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product-api';
import { Product } from '../types';

export const useProductOperations = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: productApi.fetchProducts,
  });

  const useProductQuery = (id: string) => useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.fetchProduct(id),
  });

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) => [...oldProducts, newProduct]);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<Product>(['product', updatedProduct.id], updatedProduct);
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) =>
        oldProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
      );
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ['product', deletedId] });
      queryClient.setQueryData<Product[]>(['products'], (oldProducts = []) =>
        oldProducts.filter((product) => product.id !== deletedId)
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
