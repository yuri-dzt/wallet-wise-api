import { IUser } from "../../../../domain/entities/user/index";

export interface UpdateUserDto extends Omit<IUser, "name" | "email" | "password" | "created_at" | "updated_at"> {
  name?: string;
  email?: string;
}