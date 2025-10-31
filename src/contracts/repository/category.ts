import { IRepository } from "./index";
import { GetCategoriesDto } from "../../app/use-cases/category/get/dto";
import { Category, CategoryCollection } from "../../domain/entities/category";

export interface ICategoryRepository extends IRepository<Category> {
  getAll: (props?: GetCategoriesDto) => Promise<CategoryCollection>
}