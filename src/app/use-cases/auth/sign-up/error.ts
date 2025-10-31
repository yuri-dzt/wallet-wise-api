export class SignUpUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on sign up: " + message);
    this.name = "SignUpUseCaseError";
  }
}
