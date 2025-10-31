import { CreateCategoryDto } from "./dto";
import { CreateCategoryUseCaseError } from "./error";
import { Category } from "../../../../domain/entities/category";
import { ICategoryDto } from "../../../../contracts/dtos/category";
import { CategoryMapper } from "../../../../contracts/mappers/category";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly adminRepo: IAdminRepository,
  ) { }

  async execute(props: CreateCategoryDto): Promise<ICategoryDto | CreateCategoryUseCaseError> {
    try {
      const adminExist = await this.adminRepo.findById(props.admin_id);
      if (!adminExist) {
        return new CreateCategoryUseCaseError("Unauthorized");
      }

      const category = new Category(props)

      await this.categoryRepo.create(category);
      return CategoryMapper.toDto(category);

    } catch {
      return new CreateCategoryUseCaseError("Error occurred while creating category");
    }
  }
}
