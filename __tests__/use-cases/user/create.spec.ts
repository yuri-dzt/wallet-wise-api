import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { makeAdmin } from "../../factories/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { IUserDto } from "../../../src/contracts/dtos/user";
import { IHashService } from "../../../src/contracts/services/hash";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { CreateUserUseCase } from "../../../src/app/use-cases/user/create";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { CreateUserUseCaseError } from "../../../src/app/use-cases/user/create/error";

describe("CreateUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let adminRepo: InMemoryAdminRepository;
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    adminRepo = new InMemoryAdminRepository();
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    sut = new CreateUserUseCase(userRepo, accountRepo, adminRepo, hashService);
  });

  it("should not be able to create a admin if not have permission", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "user@gmail.com",
      password: "123456",
      admin_id: "wrong_id",
    })

    expect(response).toBeInstanceOf(CreateUserUseCaseError);
    expect((response as CreateUserUseCaseError).message).toEqual("Error on create user: Unauthorized");
    expect(userRepo.users).toHaveLength(0);
  })

  it("should not be able to create a admin if already exists an admin with this email", async () => {
    const admin = makeAdmin({ email: "admin@gmail.com" })
    accountRepo.admins.push(admin)
    adminRepo.admins.push(admin)

    const response = await sut.execute({
      name: "John Doe",
      email: "admin@gmail.com",
      password: "123456",
      admin_id: admin.id,
    })

    expect(response).toBeInstanceOf(CreateUserUseCaseError);
    expect((response as CreateUserUseCaseError).message).toEqual("Error on create user: Already exists an account with this email");
    expect(userRepo.users).toHaveLength(0);
  })

  it("should not be able to create a user if already exists an user with this email", async () => {
    const admin = makeAdmin({ email: "admin@gmail.com" })
    accountRepo.admins.push(admin)
    adminRepo.admins.push(admin)

    const user = makeUser({ email: "user@gmail.com" })
    accountRepo.users.push(user)
    userRepo.users.push(user)

    const response = await sut.execute({
      name: "John Doe",
      email: "user@gmail.com",
      password: "123456",
      admin_id: admin.id,
    })

    expect(response).toBeInstanceOf(CreateUserUseCaseError);
    expect((response as CreateUserUseCaseError).message).toEqual("Error on create user: Already exists an account with this email");
    expect(userRepo.users).toHaveLength(1);
  })

  it("should create a user", async () => {
    const admin = makeAdmin({ email: "admin@gmail.com" })
    accountRepo.admins.push(admin)
    adminRepo.admins.push(admin)

    const response = await sut.execute({
      name: "John Doe",
      email: "user@gmail.com",
      password: "123456",
      admin_id: admin.id,
    })

    expect((response as IUserDto).name).toEqual("John Doe");
    expect((response as IUserDto).email).toEqual("user@gmail.com");
    expect(userRepo.users).toHaveLength(1);
  })
});
