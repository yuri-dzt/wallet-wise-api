import { IAdminDto } from "../dtos/admin";
import { Admin } from "../../domain/entities/admin";

export type PersistenceAdmin = {
  id: string;
  name: string;
  email: string;
  password: string;
  permission: number;
  created_at: bigint;
  updated_at: bigint | null;
};

export class AdminMapper {
  static toPersistence(entity: Admin): PersistenceAdmin {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      permission: entity.permission,
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceAdmin): Admin {
    return new Admin({
      ...persistenceEntity,
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined
    });
  }

  static toDto(entityDomain: Admin): IAdminDto {
    return entityDomain
  }
}
