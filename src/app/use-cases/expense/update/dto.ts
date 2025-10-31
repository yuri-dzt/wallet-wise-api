import { ExpenseProps } from "../../../../domain/entities/expense/index";

export interface UpdateExpenseDto extends Omit<ExpenseProps, "category_id" | "created_at" | "updated_at" | "date" | "price"> {
  category_id?: string;
  date?: number;
  price?: number;
}