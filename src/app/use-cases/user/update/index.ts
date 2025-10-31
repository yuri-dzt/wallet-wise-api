import { UpdateUserDto } from "./dto";
import { UpdateUserUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class UpdateUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly accountRepo: IAccountRepository,
  ) { }

  async execute(props: UpdateUserDto): Promise<IUserDto | UpdateUserUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.id);
      if (!userExist) {
        return new UpdateUserUseCaseError("User not found");
      }

      if (props.name) {
        userExist.updateName(props.name);
      }

      if (props.email) {
        const emailExist = await this.accountRepo.isEmailAlreadyRegistered(props.email);
        if (emailExist) {
          return new UpdateUserUseCaseError("Already exists an account with this email");
        } else {
          userExist.updateEmail(props.email);
        }
      }

      await this.userRepo.update(userExist);
      return UserMapper.toDto(userExist);
    } catch {
      return new UpdateUserUseCaseError("Error occurred while creating user");
    }
  }
}
