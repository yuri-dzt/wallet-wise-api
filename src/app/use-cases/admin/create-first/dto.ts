import { CreateAdminProps } from "../../../../domain/entities/admin/index";

export interface CreateFirstAdminDto extends CreateAdminProps {
  secret_key: string
}