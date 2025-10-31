import { IControllerResponse } from "../../../contracts/controllers/controller";
import { UpdatePasswordUseCase } from "../../../app/use-cases/user/update-password";
import { UpdatePasswordDto } from "../../../app/use-cases/user/update-password/dto";
import { UpdatePasswordUseCaseError } from "../../../app/use-cases/user/update-password/error";

export class UpdateUserPasswordController {
  constructor(private readonly useCase: UpdatePasswordUseCase) { }

  async handle(props: UpdatePasswordDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof UpdatePasswordUseCaseError) {
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
