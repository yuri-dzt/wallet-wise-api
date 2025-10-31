export class UpdateExpenseUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update expense: " + message);
    this.name = "UpdateExpenseUseCaseError";
  }
}
