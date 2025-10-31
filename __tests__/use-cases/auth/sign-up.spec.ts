import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { User } from "../../../src/domain/entities/user";
import { makeAdmin } from "../../factories/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { EmailServiceMock } from "../../mocks/services/email";
import { IHashService } from "../../../src/contracts/services/hash";
import { IEmailService } from "../../../src/contracts/services/email";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { SignUpUseCase } from "../../../src/app/use-cases/auth/sign-up";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { SignUpUseCaseError } from "../../../src/app/use-cases/auth/sign-up/error";

describe("SignUpUseCase", () => {
  let accountRepo: InMemoryAccountRepository;
  let userRepo: InMemoryUserRepository;
  let hashService: IHashService;
  let emailService: IEmailService;
  let sut: SignUpUseCase;

  beforeEach(() => {
    accountRepo = new InMemoryAccountRepository();
    userRepo = new InMemoryUserRepository();
    hashService = new HashServiceMock();
    emailService = new EmailServiceMock();
    sut = new SignUpUseCase(accountRepo, userRepo, hashService, emailService);
  });

  it("should not sign up if already exist an user with this email", async () => {
    const user = makeUser();
    userRepo.users.push(user);
    accountRepo.users.push(user);

    const response = await sut.execute({
      name: "John Doe",
      email: user.email,
      password: "123456",
    });

    expect(response).toBeInstanceOf(SignUpUseCaseError);
    expect((response as SignUpUseCaseError).message).toEqual("Error on sign up: Already exists an account with this email");
  });

  it("should not sign up if already exist an admin with this email", async () => {
    const admin = makeAdmin();
    accountRepo.admins.push(admin);

    const response = await sut.execute({
      name: "John Doe",
      email: admin.email,
      password: "123456",
    });

    expect(response).toBeInstanceOf(SignUpUseCaseError);
    expect((response as SignUpUseCaseError).message).toEqual("Error on sign up: Already exists an account with this email");
  });

  it("should be able to create a disabled user", async () => {
    const response = await sut.execute({
      name: "John Doe",
      email: "5oB3O@example.com",
      password: "123456",
    });

    expect(response).toBeInstanceOf(User);
    expect((response as User).name).toEqual("John Doe");
    expect((response as User).email).toEqual("5oB3O@example.com");
    expect((response as User).active).toEqual(false);
    expect(userRepo.users).toHaveLength(1);
  })
});
