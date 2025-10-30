export class GetAdminsUseCaseError extends Error {
  constructor(message?: string) {
    super("Error on get admins: " + message);
    this.name = "GetAdminsUseCaseError";
  }
}
