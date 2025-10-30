import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { GetAdminsUseCase } from "../../../src/app/use-cases/admin/get";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";

describe("GetAdminsUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let sut: GetAdminsUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    sut = new GetAdminsUseCase(adminRepo);
  });

  it("should be return a empty array if does not exist admins", async () => {
    const response = await sut.execute()

    expect(response).toEqual([]);
  })

  it("should be able to get a admins", async () => {
    const admin1 = makeAdmin({
      id: '1',
      email: "admin1@gmail.com",
    })
    const admin2 = makeAdmin({
      id: '2',
      email: "admin2@gmail.com",
    })
    await adminRepo.create(admin1)
    await adminRepo.create(admin2)

    const response = await sut.execute()

    expect(response).toHaveLength(2)
  });
});
