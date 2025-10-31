import { ExpenseProps } from "../../../../domain/entities/expense/index";

export interface CreateExpenseDto extends Omit<ExpenseProps, "id" | "created_at" | "updated_at"> {
  id?: string;
  user_id: string;
  category_id: string;
  date: number;
  price: number;
}