export class DeleteAdminUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete admin: " + message);
    this.name = "DeleteAdminUseCaseError";
  }
}
