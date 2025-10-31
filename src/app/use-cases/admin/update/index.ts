import { UpdateAdminDto } from "./dto";
import { UpdateAdminUseCaseError } from "./error";
import { IAdminDto } from "../../../../contracts/dtos/admin";
import { AdminMapper } from "../../../../contracts/mappers/admin";
import { IHashService } from "../../../../contracts/services/hash";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class UpdateAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly hashService: IHashService
  ) { }

  async execute(props: UpdateAdminDto): Promise<IAdminDto | UpdateAdminUseCaseError> {
    const adminExists = await this.adminRepo.findById(props.id);
    if (!adminExists) {
      return new UpdateAdminUseCaseError("Admin not found");
    }

    try {
      if (props.name) {
        adminExists.updateName(props.name);
      }
      if (props.email) {
        const emailExist = await this.accountRepo.isEmailAlreadyRegistered(props.email);
        if (emailExist) {
          return new UpdateAdminUseCaseError("Already exists an account with this email");
        }

        adminExists.updateEmail(props.email);
      }
      if (props.password) {
        const hashedPassword = await this.hashService.hash(props.password);
        adminExists.updatePassword(hashedPassword);
      }

      if (props.permission) {
        adminExists.updatePermission(props.permission);
      }

      await this.adminRepo.update(adminExists);
      return AdminMapper.toDto(adminExists);
    } catch {
      return new UpdateAdminUseCaseError("Occurred an error updating admin");
    }
  }
}
