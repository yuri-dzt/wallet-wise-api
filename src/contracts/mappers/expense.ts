import { IExpenseDto } from "../dtos/expense";
import { Expense } from "../../domain/entities/expense";

export type PersistenceExpense = {
  id: string;
  user_id: string;
  category_id: string;
  date: bigint;
  price: bigint;
  created_at: bigint;
  updated_at: bigint | null;
};

export class ExpenseMapper {
  static toPersistence(entity: Expense): PersistenceExpense {
    return {
      id: entity.id,
      user_id: entity.user_id,
      category_id: entity.category_id,
      date: BigInt(entity.date),
      price: BigInt(entity.price),
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceExpense): Expense {
    return new Expense({
      id: persistenceEntity.id,
      category_id: persistenceEntity.category_id,
      user_id: persistenceEntity.user_id,
      date: Number(persistenceEntity.date),
      price: Number(persistenceEntity.price),
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined
    });
  }

  static toDto(entityDomain: Expense): IExpenseDto {
    return entityDomain
  }
}
