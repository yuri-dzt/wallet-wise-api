export class UpdateAdminUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update admin: " + message);
    this.name = "UpdateAdminUseCaseError";
  }
}
