import { GetUsersDto } from "../../../app/use-cases/user/get/dto";
import { GetUsersUseCase } from "../../../app/use-cases/user/get";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { GetUsersUseCaseError } from "../../../app/use-cases/user/get/error";

export class GetUsersController {
  constructor(private readonly useCase: GetUsersUseCase) { }

  async handle(props: GetUsersDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof GetUsersUseCaseError) {
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
