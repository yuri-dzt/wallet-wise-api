import { BcryptService } from "../../services/hash";
import { UpdateAdminController } from "../../controllers/admin/update";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { UpdateAdminUseCase } from "../../../app/use-cases/admin/update";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const UpdateAdminControllerFactory = () => {
  const adminRepo = new PrismaAdminRepository();
  const accountRepo = new PrismaAccountRepository();
  const hashService = new BcryptService();
  const useCase = new UpdateAdminUseCase(
    adminRepo,
    accountRepo,
    hashService
  );
  return new UpdateAdminController(useCase);
};
