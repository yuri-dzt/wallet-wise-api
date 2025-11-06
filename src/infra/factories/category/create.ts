import { PrismaAdminRepository } from "../../repositories/prisma/admin";
import { CreateCategoryController } from "../../controllers/category/create";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";
import { CreateCategoryUseCase } from "../../../app/use-cases/category/create";

export const CreateCategoryControllerFactory = () => {
  const categoryRepo = new PrismaCategoryRepository();
  const adminRepo = new PrismaAdminRepository();
  const useCase = new CreateCategoryUseCase(
    categoryRepo,
    adminRepo,
  );
  return new CreateCategoryController(useCase);
};
