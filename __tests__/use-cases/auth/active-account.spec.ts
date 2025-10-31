import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { ActiveAccountUseCase } from "../../../src/app/use-cases/auth/active-account";
import { ActiveAccountUseCaseError } from "../../../src/app/use-cases/auth/active-account/error";

describe("ActiveAccountUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let sut: ActiveAccountUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new ActiveAccountUseCase(userRepo);
  });

  it("should not be able to active account if user does not exist", async () => {
    const result = await sut.execute({ email: "user@gmail.com" });

    expect(result).toBeInstanceOf(ActiveAccountUseCaseError);
    expect((result as ActiveAccountUseCaseError).message).toEqual("Error on active account: User not found");
  });

  it("should be able to active account", async () => {
    const user = makeUser({ active: false })
    userRepo.users.push(user)

    const result = await sut.execute({ email: user.email });

    expect(result).toBeUndefined();
    expect(user.active).toEqual(true);
  })
});
