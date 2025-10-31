import { ICategoryDto } from "../dtos/category";
import { Category } from "../../domain/entities/category";

export type PersistenceCategory = {
  id: string;
  name: string;
  description: string | null;
  created_at: bigint;
  updated_at: bigint | null;
};

export class CategoryMapper {
  static toPersistence(entity: Category): PersistenceCategory {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description || null,
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceCategory): Category {
    return new Category({
      id: persistenceEntity.id,
      name: persistenceEntity.name,
      description: persistenceEntity.description || undefined,
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined
    });
  }

  static toDto(entityDomain: Category): ICategoryDto {
    return entityDomain
  }
}
