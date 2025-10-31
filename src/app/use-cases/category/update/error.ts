export class UpdateCategoryUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on update category: " + message);
    this.name = "UpdateCategoryUseCaseError";
  }
}
