import { IControllerResponse } from "../../../contracts/controllers/controller";
import { SendEmailResetPasswordUseCase } from "../../../app/use-cases/user/send-email-reset-password";
import { SendEmailResetPasswordDto } from "../../../app/use-cases/user/send-email-reset-password/dto";
import { SendEmailResetPasswordUseCaseError } from "../../../app/use-cases/user/send-email-reset-password/error";

export class SendEmailResetPasswordController {
  constructor(private readonly useCase: SendEmailResetPasswordUseCase) { }

  async handle(props: SendEmailResetPasswordDto): Promise<IControllerResponse> {
    const result = await this.useCase.execute(props);

    if (result instanceof SendEmailResetPasswordUseCaseError) {
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
