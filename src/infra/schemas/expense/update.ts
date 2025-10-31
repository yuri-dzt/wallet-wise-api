import { z } from "zod";

export const updateExpenseSchema = z.object({
  id: z.string().min(1, "Campo obrigatório"),
  user_id: z.string().min(1, "Campo obrigatório"),
  category_id: z.string().optional(),
  date: z.number().optional(),
  price: z.number().optional(),
});

export type UpdateExpenseRequestBody = z.infer<typeof updateExpenseSchema>;
