import { BcryptService } from "../../services/hash";
import { CreateAdminController } from "../../controllers/admin/create";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { CreateAdminUseCase } from "../../../app/use-cases/admin/create";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const CreateAdminControllerFactory = () => {
  const adminRepo = new PrismaAdminRepository();
  const accountRepo = new PrismaAccountRepository();
  const hashService = new BcryptService();
  const useCase = new CreateAdminUseCase(
    adminRepo,
    accountRepo,
    hashService
  );
  return new CreateAdminController(useCase);
};
