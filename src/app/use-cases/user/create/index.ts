import { CreateUserDto } from "./dto";
import { CreateUserUseCaseError } from "./error";
import { User } from "../../../../domain/entities/user";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { IHashService } from "../../../../contracts/services/hash";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class CreateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly adminRepo: IAdminRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: CreateUserDto): Promise<IUserDto | CreateUserUseCaseError> {
    try {
      const adminExist = await this.adminRepo.findById(props.admin_id);
      if (!adminExist) {
        return new CreateUserUseCaseError("Unauthorized");
      }

      const emailExist = await this.accountRepo.isEmailAlreadyRegistered(props.email);
      if (emailExist) {
        return new CreateUserUseCaseError("Already exists an account with this email");
      }

      const hashedPassword = await this.hashService.hash(props.password);
      const user = new User({
        ...props,
        password: hashedPassword,
      })

      await this.userRepo.create(user);
      return UserMapper.toDto(user);
    } catch {
      return new CreateUserUseCaseError("Error occurred while creating user");
    }
  }
}
