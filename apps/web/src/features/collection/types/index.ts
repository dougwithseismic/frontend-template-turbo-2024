import { z } from "zod";

export const CollectionSchema = z.object({
  id: z.string(),
  // Add other properties with their respective Zod validators
  // For example:
  // name: z.string().min(1).max(100),
  // createdAt: z.string().datetime(),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const NewCollectionSchema = CollectionSchema.omit({ id: true });
export type NewCollection = z.infer<typeof NewCollectionSchema>;
