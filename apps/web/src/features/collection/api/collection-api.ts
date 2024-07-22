// api/collection-api.ts
import { z } from "zod";
import { CollectionSchema, NewCollectionSchema, Collection, NewCollection } from "../types";

const BASE_URL = "/api";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse<T>(response: Response, schema: z.ZodType<T>): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    throw error;
  }
}

async function handleApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (error instanceof ApiError || error instanceof z.ZodError) {
      throw error;
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}

export const collectionApi = {
  fetchCollections: () =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/collections`, {
        credentials: "include",
      });
      return handleResponse(response, z.array(CollectionSchema));
    }),

  fetchCollection: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/collections/${id}`, {
        credentials: "include",
      });
      return handleResponse(response, CollectionSchema);
    }),

  createCollection: (newCollection: NewCollection) =>
    handleApiCall(async () => {
      const validatedData = NewCollectionSchema.parse(newCollection);
      const response = await fetch(`${BASE_URL}/collections`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, CollectionSchema);
    }),

  updateCollection: (updates: Partial<Collection> & { id: string }) =>
    handleApiCall(async () => {
      const { id, ...data } = updates;
      const validatedData = CollectionSchema.partial().parse(data);
      const response = await fetch(`${BASE_URL}/collections/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, CollectionSchema);
    }),

  deleteCollection: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/collections/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
      }
    }),
};
