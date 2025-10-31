import { CreateExpenseDto } from "../../../app/use-cases/expense/create/dto";
import { CreateExpenseUseCase } from "../../../app/use-cases/expense/create";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { CreateExpenseUseCaseError } from "../../../app/use-cases/expense/create/error";

export class CreateExpenseController {
  constructor(private readonly useCase: CreateExpenseUseCase) { }

  async handle(props: CreateExpenseDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof CreateExpenseUseCaseError) {
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
