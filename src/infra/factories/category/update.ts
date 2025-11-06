import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { UpdateCategoryController } from "../../controllers/category/update";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";
import { UpdateCategoryUseCase } from "../../../app/use-cases/category/update";

export const UpdateCategoryControllerFactory = () => {
  const categoryRepo = new PrismaCategoryRepository();
  const adminRepo = new PrismaAdminRepository();
  const useCase = new UpdateCategoryUseCase(
    categoryRepo,
    adminRepo
  );
  return new UpdateCategoryController(useCase);
};
