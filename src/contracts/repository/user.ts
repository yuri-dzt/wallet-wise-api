import { IRepository } from "./index";
import { GetUsersDto } from "../../app/use-cases/user/get/dto";
import { User, UserCollection } from "../../domain/entities/user";

export interface IUserRepository extends IRepository<User> {
  findByEmail: (email: string) => Promise<User | undefined>
  getAll: (props?: GetUsersDto) => Promise<UserCollection>
}