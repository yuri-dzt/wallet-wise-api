import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { Admin } from "../../../src/domain/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { CreateAdminUseCase } from "../../../src/app/use-cases/admin/create";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { CreateAdminUseCaseError } from "../../../src/app/use-cases/admin/create/error";

describe("CreateAdminUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: CreateAdminUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new CreateAdminUseCase(adminRepo, accountRepo, hashService);
  });

  it("should not be able to create a admin if already exists an admin with this email", async () => {
    const admin = makeAdmin()
    accountRepo.admins.push(admin)

    const response = await sut.execute({
      name: "John Doe",
      email: "admin@gmail.com",
      password: "123456",
      permission: 1
    })

    expect(response).toBeInstanceOf(CreateAdminUseCaseError);
    expect((response as CreateAdminUseCaseError).message).toEqual("Error on create admin: Already exists an account with this email");
  })

  it("should create an admin", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "5oB3O@example.com",
      password: "123456",
      permission: 1
    })

    expect(response).toBeInstanceOf(Admin);
    expect((response as Admin).name).toEqual("John Doe");
    expect((response as Admin).email).toEqual("5oB3O@example.com");
  });
});
