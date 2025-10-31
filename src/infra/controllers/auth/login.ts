import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { LoginUseCaseDto } from "../../../app/use-cases/auth/login/dto";
import { LoginUseCaseError } from "../../../app/use-cases/auth/login/error";
import { IControllerResponse } from "../../../contracts/controllers/controller";

export class LoginController {
  constructor(private readonly useCase: LoginUseCase) { }

  async handle(props: LoginUseCaseDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof LoginUseCaseError) {
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
