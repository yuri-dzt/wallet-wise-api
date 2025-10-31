import { Category, CategoryProps } from "../../../src/domain/entities/category";

export const makeCategory = (override?: Partial<CategoryProps>) => {
  return new Category({
    id: "1",
    name: "Category",
    description: "Category description",
    ...override,
  });
};
