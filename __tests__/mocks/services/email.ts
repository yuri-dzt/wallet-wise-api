import { IEmailSenderService, ResetPasswordProps } from "../../../src/contracts/services/email";

export class EmailServiceMock implements IEmailSenderService {
  async resetPassword(props: ResetPasswordProps): Promise<void> {
    return Promise.resolve();
  }
}
