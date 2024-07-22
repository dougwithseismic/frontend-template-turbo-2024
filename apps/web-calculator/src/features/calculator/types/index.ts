import { z } from "zod";

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string().optional(),
  content: z
    .array(
      z.object({
        type: z.string(),
        content: z.string(),
      }),
    )
    .optional(),
  required: z.boolean(),
  type: z.enum(["text", "number", "radio", "checkbox", "select", "multiple"]),
  validation: z.object({
    schema: z.any(), // This will be a Zod schema
    errorMessage: z.string().optional(),
  }),
  options: z.array(z.object({ label: z.string(), value: z.string() })), // For radio, checkbox, select, multiple
});

export type Question = z.infer<typeof QuestionSchema>;

export const CalculatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  questions: z.array(QuestionSchema),
  result: z.object({
    title: z.string(),
    description: z.string(),
    value: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Add other properties as needed
});

export type Calculator = z.infer<typeof CalculatorSchema>;

export const NewCalculatorSchema = CalculatorSchema.omit({ id: true });
export type NewCalculator = z.infer<typeof NewCalculatorSchema>;
