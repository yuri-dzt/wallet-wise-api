import { Expense, ExpenseProps } from "../../../src/domain/entities/expense";

export const makeExpense = (override?: Partial<ExpenseProps>) => {
  return new Expense({
    id: "1",
    price: 100,
    category_id: "1",
    date: Date.now(),
    user_id: "1",
    ...override,
  });
};
