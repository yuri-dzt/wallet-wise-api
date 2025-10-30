import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { Admin } from "../../../src/domain/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { UpdateAdminUseCase } from "../../../src/app/use-cases/admin/update";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { UpdateAdminUseCaseError } from "../../../src/app/use-cases/admin/update/error";

describe("UpdateAdminUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: UpdateAdminUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new UpdateAdminUseCase(adminRepo, accountRepo, hashService);
  });

  it("should not be able to update if admin does not exists", async () => {
    const response = await sut.execute({
      id: "1",
      name: "new name",
      email: "newemail@example.com",
      password: "123456",
      permission: 1
    })

    expect(response).toBeInstanceOf(UpdateAdminUseCaseError);
    expect((response as UpdateAdminUseCaseError).message).toEqual("Error on update admin: Admin not found");
  })

  it("should not be able to update email if already exists an admin with this email", async () => {
    const admin1 = makeAdmin()
    await adminRepo.create(admin1)
    accountRepo.admins.push(admin1)

    const admin2 = makeAdmin({
      email: "admin2@gmail.com",
    })
    await adminRepo.create(admin2)
    accountRepo.admins.push(admin2)

    const response = await sut.execute({
      id: admin1.id,
      name: "new name",
      email: "admin2@gmail.com",
      password: "123456",
      permission: 1
    })

    expect(response).toBeInstanceOf(UpdateAdminUseCaseError);
    expect((response as UpdateAdminUseCaseError).message).toEqual("Error on update admin: Already exists an account with this email");
  })

  it("should be update an admin", async () => {
    const admin = makeAdmin()
    await adminRepo.create(admin)

    const response = await sut.execute({
      id: admin.id,
      name: "new name",
      email: "newemail@example.com",
      password: "123456",
      permission: 1
    })

    expect(response).toBeInstanceOf(Admin);
    expect((response as Admin).name).toEqual("new name");
    expect((response as Admin).email).toEqual("newemail@example.com");
  });
});
