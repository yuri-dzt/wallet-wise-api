import { User } from "../../../src/domain/entities/user";
import { GetUsersDto } from "../../../src/app/use-cases/user/get/dto";
import { IUserRepository } from "../../../src/contracts/repository/user";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async create(entity: User): Promise<void | Error> {
    this.users.push(entity);
  }

  async update(entity: User): Promise<void | Error> {
    const index = this.users.findIndex(c => c.id === entity.id)

    this.users[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.users = this.users.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(c => c.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(c => c.email === email);
  }

  async getAll(props?: GetUsersDto): Promise<User[]> {
    return this.users;
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.users.find(c => c.token === token);
  }
}
