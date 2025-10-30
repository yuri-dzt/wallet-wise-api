import { IRepository } from "./index";
import { GetAdminsDto } from "../../app/use-cases/admin/get/dto";
import { Admin, AdminCollection } from "../../domain/entities/admin";

export interface IAdminRepository extends IRepository<Admin> {
  findByEmail: (email: string) => Promise<Admin | undefined>
  getAll: (props?: GetAdminsDto) => Promise<AdminCollection>
}