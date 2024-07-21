
import { Product } from '../types';

const BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const productApi = {
  fetchProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products`, {
      credentials: 'include',
    });
    return handleResponse<Product[]>(response);
  },

  fetchProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      credentials: 'include',
    });
    return handleResponse<Product>(response);
  },

  createProduct: async (newProduct: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    return handleResponse<Product>(response);
  },

  updateProduct: async (updates: Partial<Product> & { id: string }): Promise<Product> => {
    const { id, ...data } = updates;
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(response);
  },

  deleteProduct: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
};
