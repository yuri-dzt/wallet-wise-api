import { GetCategoryController } from "../../controllers/category/get";
import { GetCategoriesUseCase } from "../../../app/use-cases/category/get";
import { PrismaCategoryRepository } from "../../repositories/prisma/category";

export const GetCategoryControllerFactory = () => {
  const categoryRepo = new PrismaCategoryRepository();
  const useCase = new GetCategoriesUseCase(
    categoryRepo
  );
  return new GetCategoryController(useCase);
};
