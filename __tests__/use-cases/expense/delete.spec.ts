import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { makeExpense } from "../../factories/entities/expense";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { InMemoryExpenseRepository } from "../../mocks/repositories/expense";
import { DeleteExpenseUseCase } from "../../../src/app/use-cases/expense/delete";

describe("DeleteExpenseUseCase", () => {
  let expenseRepo: InMemoryExpenseRepository
  let userRepo: InMemoryUserRepository;
  let sut: DeleteExpenseUseCase;

  beforeEach(() => {
    expenseRepo = new InMemoryExpenseRepository();
    userRepo = new InMemoryUserRepository();
    sut = new DeleteExpenseUseCase(expenseRepo, userRepo);
  });

  it("should not be able to delete if user does not exists", async () => {
    const response = await sut.execute({
      user_id: "wrong_user_id",
      expense_id: "wrong_expense_id",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on delete expense: User not found");
  })

  it("should not be able to delete if expense does not exists", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const response = await sut.execute({
      user_id: user.id,
      expense_id: "wrong_expense_id",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on delete expense: Expense not found");
  })

  it("should not be able to delete if expense does not belongs to user", async () => {
    const user1 = makeUser({ id: '1' })
    const user2 = makeUser({ id: '2' })
    userRepo.users.push(user1)
    userRepo.users.push(user2)

    const expense = makeExpense({ user_id: user1.id })
    expenseRepo.expenses.push(expense)

    const response = await sut.execute({
      user_id: user2.id,
      expense_id: expense.id,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on delete expense: Unauthorized");
  })

  it("should be able to delete a expense", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const expense = makeExpense()
    expenseRepo.expenses.push(expense)

    expect(expenseRepo.expenses).toHaveLength(1);

    const response = await sut.execute({
      expense_id: expense.id,
      user_id: user.id
    })

    expect(expenseRepo.expenses).toHaveLength(0);
    expect(response).toBeUndefined();

  })
});
