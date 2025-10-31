import { UpdateCategoryDto } from "./dto";
import { UpdateCategoryUseCaseError } from "./error";
import { ICategoryDto } from "../../../../contracts/dtos/category";
import { CategoryMapper } from "../../../../contracts/mappers/category";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly adminRepo: IAdminRepository,
  ) { }

  async execute(props: UpdateCategoryDto): Promise<ICategoryDto | UpdateCategoryUseCaseError> {
    try {
      const adminExist = await this.adminRepo.findById(props.admin_id);
      if (!adminExist) {
        return new UpdateCategoryUseCaseError("Unauthorized");
      }

      const categoryExist = await this.categoryRepo.findById(props.id);
      if (!categoryExist) {
        return new UpdateCategoryUseCaseError("Category not found");
      }

      if (props.name) {
        categoryExist.updateName(props.name);
      }

      if (props.description) {
        categoryExist.updateDescription(props.description);
      }

      await this.categoryRepo.update(categoryExist);
      return CategoryMapper.toDto(categoryExist);
    } catch {
      return new UpdateCategoryUseCaseError("Error occurred while updating category");
    }
  }
}
