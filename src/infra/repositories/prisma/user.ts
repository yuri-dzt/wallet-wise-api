import { prisma } from "../../../core/prisma/client";
import { PrismaError } from "../../../core/prisma/error";
import { UserMapper } from "../../../contracts/mappers/user";
import { GetUsersDto } from "../../../app/use-cases/user/get/dto";
import { IUserRepository } from "../../../contracts/repository/user";
import { User, UserCollection } from "../../../domain/entities/user";

export class PrismaUserRepository implements IUserRepository {
  async create(entity: User): Promise<void | Error> {
    try {
      await prisma.user.create({
        data: {
          id: entity.id,
          name: entity.name,
          email: entity.email,
          password: entity.password,
          created_at: BigInt(entity.created_at),
          updated_at: entity.updated_at ? BigInt(entity.updated_at) : null,
          token: entity.token ? entity.token : null,
          active: entity.active
        }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: User): Promise<void | Error> {
    try {
      await prisma.user.update({
        where: { id: entity.id },
        data: UserMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.user.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      const result = await prisma.user.findUnique({
        where: { id }
      });
      return result ? UserMapper.toDomain(result) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(props?: GetUsersDto): Promise<UserCollection> {
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

      const result = await prisma.user.findMany({
        where: filters
      })

      return result.map(UserMapper.toDomain)
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await prisma.user.findUnique({
        where: { email }
      });
      return result ? UserMapper.toDomain(result) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByToken(token: string): Promise<User | undefined> {
    try {
      const result = await prisma.user.findUnique({
        where: { token }
      });
      return result ? UserMapper.toDomain(result) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }
}