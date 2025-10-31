export class SendEmailResetPasswordUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on send email reset password: " + message);
    this.name = "SendEmailResetPasswordUseCaseError";
  }
}
