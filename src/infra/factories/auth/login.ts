import { JwtService } from "../../services/jwt";
import { BcryptService } from "../../services/hash";
import { LoginController } from "../../controllers/auth/login";
import { LoginUseCase } from "../../../app/use-cases/auth/login";
import { PrismaAccountRepository } from "../../repositories/prisma/account";

export const LoginControllerFactory = () => {
  const accountRepo = new PrismaAccountRepository();
  const hashService = new BcryptService();
  const jwtService = new JwtService();
  const useCase = new LoginUseCase(
    accountRepo,
    hashService,
    jwtService
  );
  return new LoginController(useCase);
};
