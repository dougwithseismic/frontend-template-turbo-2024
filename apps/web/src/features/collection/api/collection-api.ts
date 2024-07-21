// @@filename: packages/tools/plop-templates/api.ts.hbs

import { Collection } from '../types';

const BASE_URL = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const collectionApi = {
  fetchCollections: async (): Promise<Collection[]> => {
    const response = await fetch(`${BASE_URL}/collections`, {
      credentials: 'include',
    });
    return handleResponse<Collection[]>(response);
  },

  fetchCollection: async (id: string): Promise<Collection> => {
    const response = await fetch(`${BASE_URL}/collections/${id}`, {
      credentials: 'include',
    });
    return handleResponse<Collection>(response);
  },

  createCollection: async (newCollection: Omit<Collection, 'id'>): Promise<Collection> => {
    const response = await fetch(`${BASE_URL}/collections`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCollection),
    });
    return handleResponse<Collection>(response);
  },

  updateCollection: async (updates: Partial<Collection> & { id: string }): Promise<Collection> => {
    const { id, ...data } = updates;
    const response = await fetch(`${BASE_URL}/collections/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Collection>(response);
  },

  deleteCollection: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/collections/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },
};