import { IRepository } from "./index";
import { GetExpensesDto } from "../../app/use-cases/expense/get/dto";
import { Expense, ExpenseCollection } from "../../domain/entities/expense";

export interface IExpenseRepository extends IRepository<Expense> {
  getAll: (props?: GetExpensesDto) => Promise<ExpenseCollection>
}