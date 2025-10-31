import { ActiveAccountDto } from "./dto";
import { ActiveAccountUseCaseError } from "./error";
import { IUserRepository } from "../../../../contracts/repository/user";

export class ActiveAccountUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(props: ActiveAccountDto): Promise<undefined | ActiveAccountUseCaseError> {
    try {
      const userExist = await this.userRepo.findByEmail(props.email);
      if (!userExist) {
        return new ActiveAccountUseCaseError("User not found");
      }

      await userExist.updateActive(true);
      await this.userRepo.update(userExist);

      return undefined
    } catch {
      return new ActiveAccountUseCaseError("Error occurred while active account");
    }
  }
}
