import { GetCategoriesUseCase } from "../../../app/use-cases/category/get";
import { GetCategoriesDto } from "../../../app/use-cases/category/get/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { GetCategoriesUseCaseError } from "../../../app/use-cases/category/get/error";

export class GetCategoryController {
  constructor(private readonly useCase: GetCategoriesUseCase) { }

  async handle(props: GetCategoriesDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetCategoriesUseCaseError) {
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
