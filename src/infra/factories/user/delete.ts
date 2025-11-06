import { DeleteUserController } from "../../controllers/user/delete";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { DeleteUserUseCase } from "../../../app/use-cases/user/delete";
import { PrismaAdminRepository } from "../../repositories/prisma/admin";

export const DeleteUserControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const adminRepo = new PrismaAdminRepository();
  const useCase = new DeleteUserUseCase(
    userRepo,
    adminRepo,
  );
  return new DeleteUserController(useCase);
};
