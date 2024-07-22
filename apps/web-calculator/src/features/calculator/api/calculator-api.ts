import { z } from "zod";
import { CalculatorSchema, NewCalculatorSchema, Calculator, NewCalculator } from "../types";

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

export const calculatorApi = {
  fetchCalculators: () =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/calculators`, {
        credentials: "include",
      });
      return handleResponse(response, z.array(CalculatorSchema));
    }),

  fetchCalculator: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/calculators/${id}`, {
        credentials: "include",
      });
      return handleResponse(response, CalculatorSchema);
    }),

  createCalculator: (newCalculator: NewCalculator) =>
    handleApiCall(async () => {
      const validatedData = NewCalculatorSchema.parse(newCalculator);
      const response = await fetch(`${BASE_URL}/calculators`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, CalculatorSchema);
    }),

  updateCalculator: (updates: Partial<Calculator> & { id: string }) =>
    handleApiCall(async () => {
      const { id, ...data } = updates;
      const validatedData = CalculatorSchema.partial().parse(data);
      const response = await fetch(`${BASE_URL}/calculators/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      return handleResponse(response, CalculatorSchema);
    }),

  deleteCalculator: (id: string) =>
    handleApiCall(async () => {
      const response = await fetch(`${BASE_URL}/calculators/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
      }
    }),
};
