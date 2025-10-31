import { IAdmin } from "../../../../domain/entities/admin";

export interface UpdateAdminDto extends Omit<IAdmin, "name" | "permission" | "email" | "password" | "created_at" | "updated_at"> {
  name?: string;
  email?: string;
  password?: string;
  permission?: number
}