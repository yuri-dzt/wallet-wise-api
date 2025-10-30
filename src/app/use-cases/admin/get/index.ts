import { GetAdminsDto } from "./dto";
import { GetAdminsUseCaseError } from "./error";
import { IAdminDto } from "../../../../contracts/dtos/admin";
import { AdminMapper } from "../../../../contracts/mappers/admin";
import { IAdminRepository } from "../../../../contracts/repository/admin";

export class GetAdminsUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ) { }

  async execute(props?: GetAdminsDto): Promise<IAdminDto[] | GetAdminsUseCaseError> {
    try {
      const admins = await this.adminRepo.getAll(props);
      if (admins.length === 0) return [];

      return admins.map(AdminMapper.toDto)
    } catch {
      return new GetAdminsUseCaseError("Occurred an error getting admins");
    }
  }
}
