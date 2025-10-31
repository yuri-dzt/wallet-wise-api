import { DeleteCategoryDto } from "./dto";
import { DeleteCategoryUseCaseError } from "./error";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { ICategoryRepository } from "../../../../contracts/repository/category";

export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepo: ICategoryRepository,
    private readonly adminRepo: IAdminRepository,
  ) { }

  async execute(props: DeleteCategoryDto): Promise<undefined | DeleteCategoryUseCaseError> {
    try {
      const adminExist = await this.adminRepo.findById(props.admin_id);
      if (!adminExist) {
        return new DeleteCategoryUseCaseError("Unauthorized");
      }

      const categoryExists = await this.categoryRepo.findById(props.category_id);
      if (!categoryExists) {
        return new DeleteCategoryUseCaseError("Category not found");
      }

      await this.categoryRepo.delete(props.category_id);
      return undefined

    } catch {
      return new DeleteCategoryUseCaseError("Error occurred while creating category");
    }
  }
}
