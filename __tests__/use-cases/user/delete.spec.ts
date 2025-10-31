import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from "../../factories/entities/user";
import { makeAdmin } from "../../factories/entities/admin";
import { IUserDto } from "../../../src/contracts/dtos/user";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { InMemoryAdminRepository } from "../../mocks/repositories/admin";
import { DeleteUserUseCase } from "../../../src/app/use-cases/user/delete";
import { DeleteUserUseCaseError } from "../../../src/app/use-cases/user/delete/error";

describe("DeleteUserUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let adminRepo: InMemoryAdminRepository;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    adminRepo = new InMemoryAdminRepository();
    sut = new DeleteUserUseCase(userRepo, adminRepo);
  });

  it("should delete a user", async () => {
    const admin = makeAdmin()
    adminRepo.admins.push(admin)

    const user = makeUser({ id: '1' })
    const user2 = makeUser({ id: '2' })

    userRepo.users.push(user)
    userRepo.users.push(user2)


    const response = await sut.execute({
      id_to_delete: user.id,
      admin_id: admin.id,
    })

    expect(response).toBeUndefined();
    expect(userRepo.users).toHaveLength(1);
  })
});
