import { SendEmailResetPasswordDto } from "./dto";
import { SendEmailResetPasswordUseCaseError } from "./error";
import { IEmailService } from "../../../../contracts/services/email";
import { IUserRepository } from "../../../../contracts/repository/user";

export class SendEmailResetPasswordUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly emailService: IEmailService
  ) { }

  async execute(props: SendEmailResetPasswordDto): Promise<undefined | SendEmailResetPasswordUseCaseError> {
    try {
      const userExist = await this.userRepo.findByEmail(props.email);
      if (!userExist) {
        return new SendEmailResetPasswordUseCaseError("User not found");
      }

      await userExist.createResetPasswordToken();
      await this.userRepo.update(userExist);

      if (!userExist.token) {
        return new SendEmailResetPasswordUseCaseError("Error occurred while sending email!");
      }

      await this.emailService.resetPassword({
        email: userExist.email,
        token: userExist.token
      });
    } catch {
      return new SendEmailResetPasswordUseCaseError("Error occurred while sending email");
    }
  }
}
