import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { makeCategory } from "../../factories/entities/category";
import { IExpenseDto } from "../../../src/contracts/dtos/expense";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { InMemoryExpenseRepository } from "../../mocks/repositories/expense";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";
import { CreateExpenseUseCase } from "../../../src/app/use-cases/expense/create";

describe("CreateExpenseUseCase", () => {
  let expenseRepo: InMemoryExpenseRepository
  let userRepo: InMemoryUserRepository;
  let categoryRepo: InMemoryCategoryRepository;
  let sut: CreateExpenseUseCase;

  beforeEach(() => {
    expenseRepo = new InMemoryExpenseRepository();
    userRepo = new InMemoryUserRepository();
    categoryRepo = new InMemoryCategoryRepository();
    sut = new CreateExpenseUseCase(expenseRepo, userRepo, categoryRepo);
  });

  it("should not be able to create a expense if user does not exists", async () => {
    const response = await sut.execute({
      user_id: "1",
      category_id: "1",
      date: Date.now(),
      price: 100,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on create expense: User not found");
  })

  it("should not be able to create a category if user does not exists", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const response = await sut.execute({
      user_id: user.id,
      category_id: "1",
      date: Date.now(),
      price: 100,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on create expense: Category not found");
  })

  it("should be able to create a expense", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const category = makeCategory()
    categoryRepo.categories.push(category)

    const response = await sut.execute({
      user_id: user.id,
      category_id: category.id,
      date: Date.now(),
      price: 100,
    })

    expect(expenseRepo.expenses).toHaveLength(1);
    expect((response as IExpenseDto).price).toEqual(100);
    expect((response as IExpenseDto).user_id).toEqual(user.id);
    expect((response as IExpenseDto).category_id).toEqual(category.id);
  })
});
