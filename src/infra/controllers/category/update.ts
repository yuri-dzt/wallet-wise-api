import { UpdateCategoryUseCase } from "../../../app/use-cases/category/update";
import { UpdateCategoryDto } from "../../../app/use-cases/category/update/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateCategoryUseCaseError } from "../../../app/use-cases/category/update/error";

export class UpdateCategoryController {
  constructor(private readonly useCase: UpdateCategoryUseCase) { }

  async handle(props: UpdateCategoryDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateCategoryUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 200,
      body: result,
    };
  }
}
