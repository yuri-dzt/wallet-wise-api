export class CreateAdminUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create admin: " + message);
    this.name = "CreateAdminUseCaseError";
  }
}
