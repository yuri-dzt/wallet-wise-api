import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { makeExpense } from "../../factories/entities/expense";
import { makeCategory } from "../../factories/entities/category";
import { IExpenseDto } from "../../../src/contracts/dtos/expense";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { InMemoryExpenseRepository } from "../../mocks/repositories/expense";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";
import { UpdateExpenseUseCase } from "../../../src/app/use-cases/expense/update";

describe("UpdateExpenseUseCase", () => {
  let expenseRepo: InMemoryExpenseRepository
  let userRepo: InMemoryUserRepository;
  let categoryRepo: InMemoryCategoryRepository;
  let sut: UpdateExpenseUseCase;

  beforeEach(() => {
    expenseRepo = new InMemoryExpenseRepository();
    userRepo = new InMemoryUserRepository();
    categoryRepo = new InMemoryCategoryRepository();
    sut = new UpdateExpenseUseCase(expenseRepo, userRepo, categoryRepo);
  });

  it("should not be able to update if expense does not exists", async () => {
    const response = await sut.execute({
      id: "wrong_expense_id",
      user_id: "wrong_user_id",
      category_id: "wrong_category_id",
      date: Date.now(),
      price: 100,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on update expense: Expense not found");
  })

  it("should not be able to update if expense does not exists", async () => {
    const expense = makeExpense()
    expenseRepo.expenses.push(expense)

    const response = await sut.execute({
      id: expense.id,
      user_id: "wrong_user_id",
      category_id: "wrong_category_id",
      date: Date.now(),
      price: 100,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on update expense: User not found");
  })

  it("should not be able to update if has category_id and category does not exists", async () => {
    const expense = makeExpense()
    expenseRepo.expenses.push(expense)

    const user = makeUser()
    userRepo.users.push(user)

    const response = await sut.execute({
      id: expense.id,
      user_id: user.id,
      category_id: "wrong_category_id",
      date: Date.now(),
      price: 100,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on update expense: Category not found");
  })

  it("should be able to update a expense", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const category = makeCategory({ id: '2' })
    categoryRepo.categories.push(category)

    const expense = makeExpense()
    expenseRepo.expenses.push(expense)

    const response = await sut.execute({
      id: expense.id,
      user_id: user.id,
      category_id: category.id,
      date: Date.now(),
      price: 200,
    })

    expect(expenseRepo.expenses).toHaveLength(1);
    expect((response as IExpenseDto).price).toEqual(200);
    expect((response as IExpenseDto).user_id).toEqual(user.id);
    expect((response as IExpenseDto).category_id).toEqual(category.id);
  })
});
