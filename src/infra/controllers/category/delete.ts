import { DeleteCategoryUseCase } from "../../../app/use-cases/category/delete";
import { DeleteCategoryDto } from "../../../app/use-cases/category/delete/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteCategoryUseCaseError } from "../../../app/use-cases/category/delete/error";

export class DeleteCategoryController {
  constructor(private readonly useCase: DeleteCategoryUseCase) { }

  async handle(props: DeleteCategoryDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteCategoryUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 204,
      body: result,
    };
  }
}
