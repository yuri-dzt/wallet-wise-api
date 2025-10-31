import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { IUser } from "../../../src/domain/entities/user";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { UpdateUserUseCase } from "../../../src/app/use-cases/user/update";
import { InMemoryAccountRepository } from "../../mocks/repositories/account";

describe("UpdateUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let accountRepo: InMemoryAccountRepository;
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    accountRepo = new InMemoryAccountRepository();
    sut = new UpdateUserUseCase(userRepo, accountRepo);
  });

  it("should create a user", async () => {
    const user = makeUser()
    userRepo.users.push(user)

    const response = await sut.execute({
      id: user.id,
      name: "Teste",
      email: "teste@gmail.com",
    })

    expect((response as IUser).name).toEqual("Teste");
    expect((response as IUser).email).toEqual("teste@gmail.com");
  })
});
