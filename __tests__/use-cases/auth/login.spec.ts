import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { JwtServiceMock } from "../../mocks/services/jwt";
import { makeAdmin } from "../../factories/entities/admin";
import { HashServiceMock } from "../../mocks/services/hash";
import { IJwtService } from "../../../src/contracts/services/jwt";
import { IHashService } from "../../../src/contracts/services/hash";
import { LoginUseCase } from "../../../src/app/use-cases/auth/login";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";
import { LoginUseCaseError } from "../../../src/app/use-cases/auth/login/error";
import { LoginUseCaseResponse } from "../../../src/app/use-cases/auth/login/dto";

describe("LoginUseCase", () => {
  let accountRepo: InMemoryAccountRepository;
  let hashService: IHashService;
  let jwtService: IJwtService;
  let sut: LoginUseCase;

  beforeEach(() => {
    accountRepo = new InMemoryAccountRepository();
    hashService = new HashServiceMock()
    jwtService = new JwtServiceMock()
    sut = new LoginUseCase(accountRepo, hashService, jwtService);
  });

  it("should not authenticate with invalid credentials", async () => {
    const result = await sut.execute({ email: "", password: "" });

    expect(result).toBeInstanceOf(LoginUseCaseError);
    expect((result as LoginUseCaseError).message).toEqual("Error on login: Invalid credentials!");
  });

  it("should be able to authenticate admin", async () => {
    const admin = makeAdmin()
    accountRepo.admins.push(admin)

    const result = await sut.execute({ email: "admin@gmail.com", password: "1234" });

    expect(result).not.toBeInstanceOf(Error);
    expect(result).toHaveProperty("access_token");
    expect(result).toHaveProperty("account_id");
    expect(result).toHaveProperty("account_type");
    expect((result as LoginUseCaseResponse).account_type).toEqual("admin")
  });

  it("should be able to authenticate user", async () => {
    const user = makeUser()
    accountRepo.users.push(user)

    const result = await sut.execute({ email: "user@gmail.com", password: "1234" });

    expect(result).not.toBeInstanceOf(Error);
    expect(result).toHaveProperty("access_token");
    expect(result).toHaveProperty("account_id");
    expect(result).toHaveProperty("account_type");
    expect((result as LoginUseCaseResponse).account_type).toEqual("user")
  });
});
