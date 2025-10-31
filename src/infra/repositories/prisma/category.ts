import { prisma } from "../../../core/prisma/client";
import { PrismaError } from "../../../core/prisma/error";
import { GetAdminsDto } from "../../../app/use-cases/admin/get/dto";
import { CategoryMapper } from "../../../contracts/mappers/category";
import { ICategoryRepository } from "../../../contracts/repository/category";
import { Category, CategoryCollection } from "../../../domain/entities/category";

export class PrismaCategoryRepository implements ICategoryRepository {
  async create(entity: Category): Promise<void | Error> {
    try {
      await prisma.category.create({
        data: CategoryMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: Category): Promise<void | Error> {
    try {
      await prisma.category.update({
        where: { id: entity.id },
        data: CategoryMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.category.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<Category | undefined> {
    try {
      const result = await prisma.category.findUnique({
        where: { id }
      });
      return result ? CategoryMapper.toDomain(result) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(props?: GetAdminsDto): Promise<CategoryCollection> {
    try {
      const filters: any = {}

      if (props && props.name) {
        filters.name = { contains: props.name, mode: "insensitive" }
      }

      if (props && props.email) {
        filters.email = { contains: props.email, mode: "insensitive" }
      }

      if (props && props.created_at) {
        filters.created_at = { gte: BigInt(props.created_at) }
      }

      if (props && props.permission) {
        filters.permission = { equals: BigInt(props.permission) }
      }

      const result = await prisma.category.findMany({
        where: filters
      })

      return result.map(CategoryMapper.toDomain)
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }
}