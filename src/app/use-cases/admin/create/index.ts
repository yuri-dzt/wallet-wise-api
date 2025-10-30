import { CreateAdminDto } from "./dto";
import { CreateAdminUseCaseError } from "./error";
import { Admin } from "../../../../domain/entities/admin";
import { IAdminDto } from "../../../../contracts/dtos/admin";
import { AdminMapper } from "../../../../contracts/mappers/admin";
import { IHashService } from "../../../../contracts/services/hash";
import { IAdminRepository } from "../../../../contracts/repository/admin";
import { IAccountRepository } from "../../../../contracts/repository/account";

export class CreateAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository,
    private readonly accountRepo: IAccountRepository,
    private readonly hashService: IHashService,
  ) { }

  async execute(props: CreateAdminDto): Promise<IAdminDto | CreateAdminUseCaseError> {
    try {
      const emailExist = await this.accountRepo.isEmailAlreadyRegistered(props.email);
      if (emailExist) {
        return new CreateAdminUseCaseError("Already exists an account with this email");
      }

      const hashedPassword = await this.hashService.hash(props.password);

      const admin = new Admin({
        ...props,
        password: hashedPassword,
      });

      await this.adminRepo.create(admin);
      return AdminMapper.toDto(admin);
    } catch {
      return new CreateAdminUseCaseError("Error occurred while creating admin");
    }
  }
}
