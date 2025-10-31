import { DeleteExpenseUseCase } from "../../../app/use-cases/expense/delete";
import { DeleteExpenseDto } from "../../../app/use-cases/expense/delete/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { DeleteExpenseUseCaseError } from "../../../app/use-cases/expense/delete/error";

export class DeleteExpenseController {
  constructor(private readonly useCase: DeleteExpenseUseCase) { }

  async handle(props: DeleteExpenseDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof DeleteExpenseUseCaseError) {
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
