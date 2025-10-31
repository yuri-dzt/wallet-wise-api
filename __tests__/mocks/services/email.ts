import { IEmailService, ResetPasswordProps } from "../../../src/contracts/services/email";

export class EmailServiceMock implements IEmailService {
  async resetPassword(props: ResetPasswordProps): Promise<void> {
    return Promise.resolve();
  }

  async activeAccount(email: string): Promise<void> {
    return Promise.resolve();
  }
}
