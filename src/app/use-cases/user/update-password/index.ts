import { UpdatePasswordDto } from "./dto";
import { UpdatePasswordUseCaseError } from "./error";
import { IUserRepository } from "../../../../contracts/repository/user";

export class UpdatePasswordUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(props: UpdatePasswordDto): Promise<undefined | UpdatePasswordUseCaseError> {
    try {
      const userExist = await this.userRepo.findByToken(props.token);
      if (!userExist) {
        return new UpdatePasswordUseCaseError("User not found");
      }

      userExist.updatePassword(props.password);
      await userExist.clearResetPasswordToken();

      await this.userRepo.update(userExist);
    } catch {
      return new UpdatePasswordUseCaseError("Error occurred while updating password");
    }
  }
}
