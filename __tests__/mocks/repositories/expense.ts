import { GetExpensesDto } from "../../../src/app/use-cases/expense/get/dto";
import { IExpenseRepository } from "../../../src/contracts/repository/expense";
import { Expense, ExpenseCollection } from "../../../src/domain/entities/expense";

export class InMemoryExpenseRepository implements IExpenseRepository {
  public expenses: ExpenseCollection = [];

  async create(entity: Expense): Promise<void | Error> {
    this.expenses.push(entity);
  }

  async update(entity: Expense): Promise<void | Error> {
    const index = this.expenses.findIndex(c => c.id === entity.id)

    this.expenses[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.expenses = this.expenses.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<Expense | undefined> {
    return this.expenses.find(c => c.id === id);
  }

  async getAll(props?: GetExpensesDto): Promise<ExpenseCollection> {
    return this.expenses;
  }
}
