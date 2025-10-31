import { z } from "zod";

export const getExpensesSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  category_id: z.string().optional(),
  date: z.number().optional(),
  price: z.number().optional(),
  created_at: z.number().optional(),
});

export type GetExpensesRequestBody = z.infer<typeof getExpensesSchema>;