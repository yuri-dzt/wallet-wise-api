import { DeleteAdminController } from "../../controllers/admin/delete";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { DeleteAdminUseCase } from "../../../app/use-cases/admin/delete";

export const DeleteAdminControllerFactory = () => {
  const adminRepo = new PrismaAdminRepository();
  const useCase = new DeleteAdminUseCase(
    adminRepo
  );
  return new DeleteAdminController(useCase);
};
