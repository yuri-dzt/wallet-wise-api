import { CategoryProps } from "../../../../domain/entities/category/index";

export interface CreateCategoryDto extends Omit<CategoryProps, "created_at" | "id"> {
  id?: string
  admin_id: string
  created_at?: number
}