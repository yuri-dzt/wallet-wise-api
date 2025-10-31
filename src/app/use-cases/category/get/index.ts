import { GetCategoriesDto } from "./dto";
import { GetCategoriesUseCaseError } from "./error";
import { ICategoryDto } from "../../../../contracts/dtos/category";
import { CategoryMapper } from "../../../../contracts/mappers/category";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class GetCategoriesUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository
  ) { }

  async execute(props?: GetCategoriesDto): Promise<ICategoryDto[] | GetCategoriesUseCaseError> {
    try {
      const categories = await this.categoryRepo.getAll(props);
      if (categories.length === 0) return [];

      return categories.map(CategoryMapper.toDto)
    } catch {
      return new GetCategoriesUseCaseError("Occurred an error getting categories");
    }
  }
}
