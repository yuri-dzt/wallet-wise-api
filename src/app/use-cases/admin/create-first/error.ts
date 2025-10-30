export class CreateFirstAdminUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create first admin: " + message);
    this.name = "CreateFirstAdminUseCaseError";
  }
}
