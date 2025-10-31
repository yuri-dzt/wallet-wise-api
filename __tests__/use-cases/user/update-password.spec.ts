import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from '../../factories/entities/user';
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { UpdatePasswordUseCase } from "../../../src/app/use-cases/user/update-password";
import { UpdatePasswordUseCaseError } from "../../../src/app/use-cases/user/update-password/error";

describe("UpdatePasswordUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let sut: UpdatePasswordUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new UpdatePasswordUseCase(userRepo);
  });

  it("should not be able to send email if user does not exist", async () => {
    const response = await sut.execute({ password: "123456", token: "wrong-token" });

    expect(response).toBeInstanceOf(UpdatePasswordUseCaseError);
    expect((response as UpdatePasswordUseCaseError).message).toEqual("Error on update password: User not found");
  })

  it("should be update password", async () => {
    const user = makeUser({ password: '1234' });
    userRepo.users.push(user);

    const last_password = user.password

    const response = await sut.execute({ password: "4321", token: 'token' });

    expect(response).toBeUndefined();
    expect(user.password).not.toBe(last_password);
  })
});
