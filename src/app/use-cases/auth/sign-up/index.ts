import { SignUpDto } from "./dto";
import { SignUpUseCaseError } from "./error";
import { User } from '../../../../domain/entities/user';
import { IUserDto } from '../../../../contracts/dtos/user';
import { UserMapper } from '../../../../contracts/mappers/user';
import { IHashService } from "../../../../contracts/services/hash";
import { IEmailService } from "../../../../contracts/services/email";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class SignUpUseCase {
  constructor(
    private readonly accountRepo: IAccountRepository,
    private readonly userRepo: IUserRepository,
    private readonly hashService: IHashService,
    private readonly emailService: IEmailService
  ) { }

  async execute(props: SignUpDto): Promise<IUserDto | SignUpUseCaseError> {
    try {
      const account = await this.accountRepo.isEmailAlreadyRegistered(props.email)
      if (account) {
        return new SignUpUseCaseError("Already exists an account with this email");
      }

      const hashedPassword = await this.hashService.hash(props.password);
      const user = new User({
        ...props,
        password: hashedPassword
      })
      await this.userRepo.create(user);

      await this.emailService.activeAccount(props.email);

      return UserMapper.toDto(user);
    } catch {
      return new SignUpUseCaseError("Error occurred while signing up");
    }
  }
}