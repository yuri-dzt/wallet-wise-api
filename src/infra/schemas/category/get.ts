import { z } from "zod";

export const getCategoriesSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  created_at: z.number().optional(),
});

export type GetCategoriesRequestBody = z.infer<typeof getCategoriesSchema>;