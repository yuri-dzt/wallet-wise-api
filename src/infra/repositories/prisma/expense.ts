import { prisma } from "../../../core/prisma/client";
import { PrismaError } from "../../../core/prisma/error";
import { ExpenseMapper } from "../../../contracts/mappers/expense";
import { GetAdminsDto } from "../../../app/use-cases/admin/get/dto";
import { IExpenseRepository } from "../../../contracts/repository/expense";
import { Expense, ExpenseCollection } from "../../../domain/entities/expense";

export class PrismaExpenseRepository implements IExpenseRepository {
  async create(entity: Expense): Promise<void | Error> {
    try {
      await prisma.expense.create({
        data: ExpenseMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }


  async update(entity: Expense): Promise<void | Error> {
    try {
      await prisma.expense.update({
        where: { id: entity.id },
        data: ExpenseMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.expense.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<Expense | undefined> {
    try {
      const result = await prisma.expense.findUnique({
        where: { id }
      });
      return result ? ExpenseMapper.toDomain(result) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(props?: GetAdminsDto): Promise<ExpenseCollection> {
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

      const result = await prisma.expense.findMany({
        where: filters
      })

      return result.map(ExpenseMapper.toDomain)
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }
}