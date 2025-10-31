import { z } from "zod";

export const deleteExpenseSchema = z.object({
  expense_id: z.string().min(1, "Campo obrigatório"),
  user_id: z.string().min(1, "Campo obrigatório"),
});

export type DeleteExpenseRequestBody = z.infer<typeof deleteExpenseSchema>;