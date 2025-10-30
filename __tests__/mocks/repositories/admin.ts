import { Admin } from "../../../src/domain/entities/admin";
import { GetAdminsDto } from "../../../src/app/use-cases/admin/get/dto";
import { IAdminRepository } from "../../../src/contracts/repository/admin";

export class InMemoryAdminRepository implements IAdminRepository {
  public admins: Admin[] = [];

  async create(entity: Admin): Promise<void | Error> {
    this.admins.push(entity);
  }

  async update(entity: Admin): Promise<void | Error> {
    const index = this.admins.findIndex(c => c.id === entity.id)

    this.admins[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.admins = this.admins.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<Admin | undefined> {
    return this.admins.find(c => c.id === id);
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return this.admins.find(c => c.email === email);
  }

  async getAll(props?: GetAdminsDto): Promise<Admin[]> {
    return this.admins;
  }
}
