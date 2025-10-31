import { UpdateExpenseUseCase } from "../../../app/use-cases/expense/update";
import { UpdateExpenseDto } from "../../../app/use-cases/expense/update/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateExpenseUseCaseError } from "../../../app/use-cases/expense/update/error";

export class UpdateExpenseController {
  constructor(private readonly useCase: UpdateExpenseUseCase) { }

  async handle(props: UpdateExpenseDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateExpenseUseCaseError) {
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
