import { CategoryProps } from "../../../../domain/entities/category/index";

export interface UpdateCategoryDto extends Omit<CategoryProps, "name" | "description" | "created_at" | "updated_at"> {
  id: string;
  admin_id: string;
  name?: string;
  description?: string;
}