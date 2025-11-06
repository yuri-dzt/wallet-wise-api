import { PrismaUserRepository } from "../../repositories/prisma/user";
import { UpdatePasswordUseCase } from "../../../app/use-cases/user/update-password";
import { UpdateUserPasswordController } from "../../controllers/user/update-password";

export const UpdateUserPasswordControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const useCase = new UpdatePasswordUseCase(
    userRepo
  );
  return new UpdateUserPasswordController(useCase);
};
