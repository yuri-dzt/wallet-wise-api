import 'dotenv/config';
import { describe, beforeEach, it, expect } from "vitest";

import { makeAdmin } from "../../factories/entities/admin";
import { Admin } from "../../../src/domain/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { CreateFirstAdminUseCase } from "../../../src/app/use-cases/admin/create-first";
import { CreateFirstAdminUseCaseError } from "../../../src/app/use-cases/admin/create-first/error";

describe("CreateFirstAdminUseCase", () => {
  let adminRepo: InMemoryAdminRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: CreateFirstAdminUseCase;

  beforeEach(() => {
    adminRepo = new InMemoryAdminRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new CreateFirstAdminUseCase(adminRepo, accountRepo, hashService);
  });

  it("should not be able to create a admin if not have permission", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "admin@gmail.com",
      password: "123456",
      permission: 1,
      secret_key: "invalid_secret_key"
    })

    expect(response).toBeInstanceOf(CreateFirstAdminUseCaseError);
    expect((response as CreateFirstAdminUseCaseError).message).toEqual("Error on create first admin: Unauthorized");
    expect(adminRepo.admins).toHaveLength(0);
  })

  it("should not be able to create a admin if already exists an admin with this email", async () => {
    const admin = makeAdmin()
    accountRepo.admins.push(admin)

    const response = await sut.execute({
      name: "John Doe",
      email: "admin@gmail.com",
      password: "123456",
      permission: 1,
      secret_key: process.env.SECRET_KEY as string
    })

    expect(response).toBeInstanceOf(CreateFirstAdminUseCaseError);
    expect((response as CreateFirstAdminUseCaseError).message).toEqual("Error on create first admin: Already exists an account with this email");
    expect(adminRepo.admins).toHaveLength(0);
  })

  it("should create an admin", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "5oB3O@example.com",
      password: "123456",
      permission: 1,
      secret_key: process.env.SECRET_KEY as string
    })

    expect(response).toBeInstanceOf(Admin);
    expect((response as Admin).name).toEqual("John Doe");
    expect((response as Admin).email).toEqual("5oB3O@example.com");
    expect(adminRepo.admins).toHaveLength(1);
  });
});
