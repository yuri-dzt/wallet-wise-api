import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { DeleteAdminUseCase } from "../../../src/app/use-cases/admin/delete";
import { DeleteAdminUseCaseError } from "../../../src/app/use-cases/admin/delete/error";

describe("DeleteAdminUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let sut: DeleteAdminUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    sut = new DeleteAdminUseCase(adminRepo);
  });

  it("should not be able to delete if who is deleting does not exists", async () => {
    const response = await sut.execute({
      id_to_delete: "2",
      admin_id: "1",
    })

    expect(response).toBeInstanceOf(DeleteAdminUseCaseError);
    expect((response as DeleteAdminUseCaseError).message).toEqual("Error on delete admin: Unauthorized");
  })

  it("should not be able to delete if admin does not exists", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const response = await sut.execute({
      id_to_delete: "2",
      admin_id: admin.id,
    })

    expect(response).toBeInstanceOf(DeleteAdminUseCaseError);
    expect((response as DeleteAdminUseCaseError).message).toEqual("Error on delete admin: Admin not found");
  })

  it("should be delete an admin", async () => {
    const admin1 = makeAdmin({
      id: '1',
      email: 'admin1@gmail.com'
    })
    const admin2 = makeAdmin({
      id: '2',
      email: 'admin2@gmail.com'
    })
    await adminRepo.create(admin1)
    await adminRepo.create(admin2)

    const response = await sut.execute({
      id_to_delete: admin1.id,
      admin_id: admin2.id,
    })

    expect(response).toBe(undefined)
    expect(adminRepo.admins.length).toEqual(1)
  });
});
