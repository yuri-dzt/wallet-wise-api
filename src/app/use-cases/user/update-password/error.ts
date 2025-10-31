export class UpdatePasswordUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update password: " + message);
    this.name = "UpdatePasswordUseCaseError";
  }
}
