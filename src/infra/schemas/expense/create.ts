import { z } from "zod";

export const createExpenseSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().min(1, 'Campo obrigatório'),
  category_id: z.string().min(1, 'Campo obrigatório'),
  date: z.number().min(1, 'Para criar uma despesa é necessário uma data'),
  price: z.number().min(1, 'Para criar uma despesa é necessário um valor'),
  created_at: z.number().optional(),
  updated_at: z.number().optional()
});

export type CreateExpenseRequestBody = z.infer<typeof createExpenseSchema>;