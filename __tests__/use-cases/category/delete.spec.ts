import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { makeCategory } from "../../factories/entities/category";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { InMemoryCategoryRepository } from "../../mocks/repositories/category";
import { DeleteCategoryUseCase } from "../../../src/app/use-cases/category/delete";

describe("DeleteCategoryUseCase", () => {
  let categoryRepo: InMemoryCategoryRepository;
  let adminRepo: InMemoryAdminRepository;
  let sut: DeleteCategoryUseCase;

  beforeEach(() => {
    categoryRepo = new InMemoryCategoryRepository();
    adminRepo = new InMemoryAdminRepository();
    sut = new DeleteCategoryUseCase(categoryRepo, adminRepo);
  });

  it("should not be able to delete if admin does not exists", async () => {
    const response = await sut.execute({
      admin_id: "wrong_id",
      category_id: "1",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on delete category: Unauthorized");
  })

  it("should not be able to delete if category does not exists", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const response = await sut.execute({
      admin_id: admin.id,
      category_id: "1",
    })

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toEqual("Error on delete category: Category not found");
  })

  it("should be delete an category", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const category = makeCategory()
    await categoryRepo.create(category)

    const response = await sut.execute({
      admin_id: admin.id,
      category_id: category.id,
    })

    expect(response).toBe(undefined)
    expect(adminRepo.admins.length).toEqual(1)
  });
});
