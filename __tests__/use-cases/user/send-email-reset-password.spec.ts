import { describe, beforeEach, it, expect } from "vitest";

import { makeUser } from '../../factories/entities/user';
import { EmailServiceMock } from '../../mocks/services/email';
import { IEmailService } from "../../../src/contracts/services/email";
import { InMemoryUserRepository } from "../../mocks/repositories/user";
import { SendEmailResetPasswordUseCase } from "../../../src/app/use-cases/user/send-email-reset-password";
import { SendEmailResetPasswordUseCaseError } from "../../../src/app/use-cases/user/send-email-reset-password/error";

describe("SendEmailResetPasswordUseCase", () => {
  let userRepo: InMemoryUserRepository;
  let emailService: IEmailService;
  let sut: SendEmailResetPasswordUseCase;

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    emailService = new EmailServiceMock();
    sut = new SendEmailResetPasswordUseCase(userRepo, emailService);
  });

  it("should not be able to send email if user does not exist", async () => {
    const response = await sut.execute({ email: "user@gmail.com", token: "token" });

    expect(response).toBeInstanceOf(SendEmailResetPasswordUseCaseError);
    expect((response as SendEmailResetPasswordUseCaseError).message).toEqual("Error on send email reset password: User not found");
  })

  it("should be able to send email", async () => {
    const user = makeUser();
    userRepo.users.push(user);

    const response = await sut.execute({ email: user.email, token: 'token' });

    expect(response).toBeUndefined();
  })
});
