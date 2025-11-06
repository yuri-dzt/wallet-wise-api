import { GetAdminsController } from "../../controllers/admin/get";
import { GetAdminsUseCase } from "../../../app/use-cases/admin/get";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";

export const GetAdminsControllerFactory = () => {
  const adminRepo = new PrismaAdminRepository();
  const useCase = new GetAdminsUseCase(
    adminRepo
  );
  return new GetAdminsController(useCase);
};
