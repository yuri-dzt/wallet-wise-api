export class GetCategoriesUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get categories: " + message);
    this.name = "GetCategoriesUseCaseError";
  }
}
