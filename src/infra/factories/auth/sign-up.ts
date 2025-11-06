import { BcryptService } from "../../services/hash";
import { EmailService } from "../../services/email";
import { SignUpController } from "../../controllers/auth/sign-up";
import { SignUpUseCase } from "../../../app/use-cases/auth/sign-up";
import { PrismaUserRepository } from "../../repositories/prisma/user";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const SignUpControllerFactory = () => {
  const accountRepo = new PrismaAccountRepository();
  const userRepo = new PrismaUserRepository();
  const hashService = new BcryptService();
  const emailService = new EmailService();
  const useCase = new SignUpUseCase(
    accountRepo,
    userRepo,
    hashService,
    emailService
  );
  return new SignUpController(useCase);
};
