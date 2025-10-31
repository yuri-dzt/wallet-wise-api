import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { makeCategory } from "../../factories/entities/category";
import { ICategoryDto } from "../../../src/contracts/dtos/category";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";
import { UpdateCategoryUseCase } from "../../../src/app/use-cases/category/update";

describe("UpdateCategoryUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let categoryRepo: InMemoryCategoryRepository;
  let sut: UpdateCategoryUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    categoryRepo = new InMemoryCategoryRepository();
    sut = new UpdateCategoryUseCase(categoryRepo, adminRepo);
  });

  it("should not be able to create if admin does not exists", async () => {
    const response = await sut.execute({
      name: "new category",
      id: "1",
      description: "new category description",
      admin_id: "1",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on update category: Unauthorized");
  });

  it("should not be able to create if category does not exists", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const response = await sut.execute({
      name: "new category",
      id: "1",
      description: "new category description",
      admin_id: admin.id,
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on update category: Category not found");
  });

  it("should be able to update a category", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const category = makeCategory()
    await categoryRepo.create(category)

    const response = await sut.execute({
      id: category.id,
      admin_id: admin.id,
      name: "new category",
      description: "new category description",
    })

    expect((response as ICategoryDto).name).toEqual("new category");
    expect((response as ICategoryDto).description).toEqual("new category description");
    expect(categoryRepo.categories).toHaveLength(1);
  })
});
