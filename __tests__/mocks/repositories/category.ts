import { GetCategoriesDto } from "../../../src/app/use-cases/category/get/dto";
import { ICategoryRepository } from "../../../src/contracts/repository/category";
import { Category, CategoryCollection } from "../../../src/domain/entities/category";

export class InMemoryCategoryRepository implements ICategoryRepository {
  public categories: Category[] = [];

  async create(entity: Category): Promise<void | Error> {
    this.categories.push(entity);
  }

  async update(entity: Category): Promise<void | Error> {
    const index = this.categories.findIndex(c => c.id === entity.id)

    this.categories[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.categories = this.categories.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find(c => c.id === id);
  }

  async getAll(props?: GetCategoriesDto): Promise<CategoryCollection> {
    return this.categories;
  }
}
