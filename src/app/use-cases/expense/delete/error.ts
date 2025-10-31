export class DeleteExpenseUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete expense: " + message);
    this.name = "DeleteExpenseUseCaseError";
  }
}
