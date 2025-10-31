import { prisma } from "../../../core/prisma/client";
import { PrismaError } from "../../../core/prisma/error";
import { AdminMapper } from "../../../contracts/mappers/admin";
import { GetAdminsDto } from "../../../app/use-cases/admin/get/dto";
import { IAdminRepository } from "../../../contracts/repository/admin";
import { Admin, AdminCollection } from "../../../domain/entities/admin";

export class PrismaAdminRepository implements IAdminRepository {
  async create(entity: Admin): Promise<void | Error> {
    try {
      await prisma.admin.create({
        data: AdminMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: Admin): Promise<void | Error> {
    try {
      await prisma.admin.update({
        where: { id: entity.id },
        data: AdminMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.admin.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<Admin | undefined> {
    try {
      const result = await prisma.admin.findUnique({
        where: { id }
      });
      return result ? AdminMapper.toDomain(result) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    try {
      const result = await prisma.admin.findUnique({
        where: { email }
      });
      return result ? AdminMapper.toDomain(result) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(props?: GetAdminsDto): Promise<AdminCollection> {
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

      const result = await prisma.admin.findMany({
        where: filters
      })

      return result.map(AdminMapper.toDomain)
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }
}