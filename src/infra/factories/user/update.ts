import { UpdateUserController } from "../../controllers/user/update";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { UpdateUserUseCase } from "../../../app/use-cases/user/update";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const UpdateUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const accountRepo = new PrismaAccountRepository();
  const useCase = new UpdateUserUseCase(
    userRepo,
    accountRepo
  );
  return new UpdateUserController(useCase);
};
