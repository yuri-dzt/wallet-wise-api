import { CreateCategoryDto } from "../../../app/use-cases/category/create/dto";
import { CreateCategoryUseCase } from "../../../app/use-cases/category/create";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateCategoryUseCaseError } from "../../../app/use-cases/category/create/error";

export class CreateCategoryController {
  constructor(private readonly useCase: CreateCategoryUseCase) { }

  async handle(props: CreateCategoryDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateCategoryUseCaseError) {
      return {
        status_code: 400,
        body: {
          message: result.message,
        },
      };
    }

    return {
      status_code: 201,
      body: result,
    };
  }
}
