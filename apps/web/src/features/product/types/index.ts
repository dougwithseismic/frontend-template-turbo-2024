import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  // Add other properties with their respective Zod validators
  // For example:
  // name: z.string().min(1).max(100),
  // createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const NewProductSchema = ProductSchema.omit({ id: true });
export type NewProduct = z.infer<typeof NewProductSchema>;
