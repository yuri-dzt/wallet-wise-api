import { DeleteAdminDto } from "./dto";
import { DeleteAdminUseCaseError } from "./error";
import { IAdminRepository } from "../../../../contracts/repository/admin";

export class DeleteAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ) { }

  async execute({ id_to_delete, admin_id }: DeleteAdminDto): Promise<undefined | DeleteAdminUseCaseError> {
    const admin = await this.adminRepo.findById(admin_id);
    if (!admin) {
      return new DeleteAdminUseCaseError("Unauthorized");
    }

    const adminExists = await this.adminRepo.findById(id_to_delete);
    if (!adminExists) {
      return new DeleteAdminUseCaseError("Admin not found");
    }

    try {
      await this.adminRepo.delete(id_to_delete);
      return undefined
    } catch {
      return new DeleteAdminUseCaseError("Occurred an error deleting admin");
    }
  }
}
