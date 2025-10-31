import { GetExpensesUseCase } from "../../../app/use-cases/expense/get";
import { GetExpensesDto } from "../../../app/use-cases/expense/get/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { GetExpensesUseCaseError } from "../../../app/use-cases/expense/get/error";

export class GetExpenseController {
  constructor(private readonly useCase: GetExpensesUseCase) { }

  async handle(props: GetExpensesDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetExpensesUseCaseError) {
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
