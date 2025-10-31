import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { ICategoryDto } from "../../../src/contracts/dtos/category";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";
import { CreateCategoryUseCase } from "../../../src/app/use-cases/category/create";

describe("CreateCategoryUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let categoryRepo: InMemoryCategoryRepository;
  let sut: CreateCategoryUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    categoryRepo = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCase(categoryRepo, adminRepo);
  });

  it("should not be able to create if admin does not exists", async () => {
    const response = await sut.execute({
      name: "new category",
      id: "1",
      description: "new category description",
      admin_id: "1",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on create category: Unauthorized");
  });

  it("should be able to create a category", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const response = await sut.execute({
      name: "category",
      id: "1",
      description: "category description",
      admin_id: admin.id,
    })

    expect((response as ICategoryDto).name).toEqual("category");
    expect((response as ICategoryDto).description).toEqual("category description");
    expect(categoryRepo.categories).toHaveLength(1);
  })
});
