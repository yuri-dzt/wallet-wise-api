import { UpdateUserUseCase } from "../../../app/use-cases/user/update";
import { UpdateUserDto } from "../../../app/use-cases/user/update/dto";
import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdateUserUseCaseError } from "../../../app/use-cases/user/update/error";

export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) { }

  async handle(props: UpdateUserDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdateUserUseCaseError) {
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
