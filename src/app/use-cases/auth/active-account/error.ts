export class ActiveAccountUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on active account: " + message);
    this.name = "ActiveAccountUseCaseError";
  }
}
