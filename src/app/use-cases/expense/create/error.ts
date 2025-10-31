export class CreateExpenseUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create expense: " + message);
    this.name = "CreateExpenseUseCaseError";
  }
}
