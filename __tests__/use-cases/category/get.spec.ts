import { describe, beforeEach, it, expect } from "vitest";

import { makeCategory } from "../../factories/entities/category";
import { GetCategoriesUseCase } from "../../../src/app/use-cases/category/get";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";

describe("GetCategoriesUseCase", () => {
  let categoryRepo: InMemoryCategoryRepository;
  let sut: GetCategoriesUseCase;

  beforeEach(() => {
    categoryRepo = new InMemoryCategoryRepository();
    sut = new GetCategoriesUseCase(categoryRepo);
  });

  it("should be return a empty array if does not exist categories", async () => {
    const response = await sut.execute()

    expect(response).toEqual([]);
  })

  it("should be able to get a categories", async () => {
    const category1 = makeCategory({ id: '1' })
    const category2 = makeCategory({ id: '2' })

    await categoryRepo.create(category1)
    await categoryRepo.create(category2)

    const response = await sut.execute()

    expect(response).toHaveLength(2)
  });
});
