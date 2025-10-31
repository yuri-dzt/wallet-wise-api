export class GetExpensesUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get expenses: " + message);
    this.name = "GetExpensesUseCaseError";
  }
}
