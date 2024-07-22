// api/product-api.ts
import { z } from "zod";
import { ProductSchema, NewProductSchema, Product, NewProduct } from "../types";

const BASE_URL = "/api";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
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

export const productApi = {
  fetchProducts: () =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/products`, {
        credentials: "include",
      });
      return handleResponse(response, z.array(ProductSchema));
    }),

  fetchProduct: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        credentials: "include",
      });
      return handleResponse(response, ProductSchema);
    }),

  createProduct: (newProduct: NewProduct) =>
    handleApiCall(async () => {
      const validatedData = NewProductSchema.parse(newProduct);
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, ProductSchema);
    }),

  updateProduct: (updates: Partial<Product> & { id: string }) =>
    handleApiCall(async () => {
      const { id, ...data } = updates;
      const validatedData = ProductSchema.partial().parse(data);
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, ProductSchema);
    }),

  deleteProduct: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
      }
    }),
};
