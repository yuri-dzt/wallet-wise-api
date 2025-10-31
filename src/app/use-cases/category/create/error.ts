export class CreateCategoryUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on create category: " + message);
    this.name = "CreateCategoryUseCaseError";
  }
}
