import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  // Add other properties as needed
});

export type Product = z.infer<typeof ProductSchema>;

export const NewProductSchema = ProductSchema.omit({ id: true });
export type NewProduct = z.infer<typeof NewProductSchema>;
