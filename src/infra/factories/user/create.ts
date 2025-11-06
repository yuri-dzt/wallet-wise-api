import { BcryptService } from "../../services/hash";
import { CreateUserController } from "../../controllers/user/create";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { CreateUserUseCase } from "../../../app/use-cases/user/create";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const CreateUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const accountRepo = new PrismaAccountRepository();
  const adminRepo = new PrismaAdminRepository();
  const hashService = new BcryptService();
  const useCase = new CreateUserUseCase(
    userRepo,
    accountRepo,
    adminRepo,
    hashService
  );
  return new CreateUserController(useCase);
};
