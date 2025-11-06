import { EmailService } from "../../services/email";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { SendEmailResetPasswordController } from "../../controllers/user/send-email-reset-password";
import { SendEmailResetPasswordUseCase } from "../../../app/use-cases/user/send-email-reset-password";

export const SendEmailResetPasswordControllerFactory = () => {
  const userRepo = new PrismaUserRepository();
  const emailService = new EmailService();
  const useCase = new SendEmailResetPasswordUseCase(
    userRepo,
    emailService
  );
  return new SendEmailResetPasswordController(useCase);
};
