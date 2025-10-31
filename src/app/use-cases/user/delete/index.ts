import { DeleteUserDto } from "./dto";
import { DeleteUserUseCaseError } from "./error";
import { IUserRepository } from "../../../../contracts/repository/user";
import { IAdminRepository } from "../../../../contracts/repository/admin";

export class DeleteUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly adminRepo: IAdminRepository,
  ) { }

  async execute(props: DeleteUserDto): Promise<undefined | DeleteUserUseCaseError> {
    try {
      const adminExist = await this.adminRepo.findById(props.admin_id);
      if (!adminExist) {
        return new DeleteUserUseCaseError("Unauthorized");
      }

      const userExists = await this.userRepo.findById(props.id_to_delete);
      if (!userExists) {
        return new DeleteUserUseCaseError("User not found");
      }

      await this.userRepo.delete(props.id_to_delete);
      return undefined
    } catch {
      return new DeleteUserUseCaseError("Error occurred while deleting user");
    }
  }
}
