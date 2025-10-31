import { describe, beforeEach, it, expect } from "vitest";

import { makeExpense } from "../../factories/entities/expense";
import { GetExpensesUseCase } from "../../../src/app/use-cases/expense/get";
import { InMemoryExpenseRepository } from "../../mocks/repositories/expense";

describe("GetExpensesUseCase", () => {
  let expenseRepo: InMemoryExpenseRepository;
  let sut: GetExpensesUseCase;

  beforeEach(() => {
    expenseRepo = new InMemoryExpenseRepository();
    sut = new GetExpensesUseCase(expenseRepo);
  });

  it("should be return a empty array if does not exist expenses", async () => {
    const response = await sut.execute()

    expect(response).toEqual([]);
  })

  it("should be able to get a expenses", async () => {
    const expense1 = makeExpense({ id: '1' })
    const expense2 = makeExpense({ id: '2' })

    await expenseRepo.create(expense1)
    await expenseRepo.create(expense2)

    const response = await sut.execute()

    expect(response).toHaveLength(2);
  });
});
