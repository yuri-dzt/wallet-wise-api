export class DeleteCategoryUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on delete category: " + message);
    this.name = "DeleteCategoryUseCaseError";
  }
}
