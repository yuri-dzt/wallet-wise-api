import { GetUsersDto } from "./dto";
import { GetUsersUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { IUserRepository } from "../../../../contracts/repository/user";

export class GetUsersUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(props?: GetUsersDto): Promise<IUserDto[] | GetUsersUseCaseError> {
    try {
      const users = await this.userRepo.getAll(props);
      if (users.length === 0) return [];

      return users.map(UserMapper.toDto)
    } catch {
      return new GetUsersUseCaseError("Occurred an error getting users");
    }
  }
}
