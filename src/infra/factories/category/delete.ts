import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { DeleteCategoryController } from "../../controllers/category/delete";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";
import { DeleteCategoryUseCase } from "../../../app/use-cases/category/delete";

export const DeleteCategoryControllerFactory = () => {
  const categoryRepo = new PrismaCategoryRepository();
  const adminRepo = new PrismaAdminRepository();
  const useCase = new DeleteCategoryUseCase(
    categoryRepo,
    adminRepo
  );
  return new DeleteCategoryController(useCase);
};
