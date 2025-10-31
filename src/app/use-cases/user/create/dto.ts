import { CreateUserProps } from "../../../../domain/entities/user/index";

export interface CreateUserDto extends CreateUserProps {
  admin_id: string
}