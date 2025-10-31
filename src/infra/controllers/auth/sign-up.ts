import { SignUpUseCase } from "../../../app/use-cases/auth/sign-up";
import { SignUpDto } from "../../../app/use-cases/auth/sign-up/dto";
import { SignUpUseCaseError } from "../../../app/use-cases/auth/sign-up/error";
import { IControllerResponse } from "../../../contracts/controllers/controller";

export class SignUpController {
  constructor(private readonly useCase: SignUpUseCase) { }

  async handle(props: SignUpDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof SignUpUseCaseError) {
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
