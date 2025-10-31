import { IUserDto } from "../dtos/user";
import { User } from "../../domain/entities/user";

export type PersistenceUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: bigint;
  updated_at: bigint | null;
};

export class UserMapper {
  static toPersistence(entity: User): PersistenceUser {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceUser): User {
    return new User({
      ...persistenceEntity,
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined
    });
  }

  static toDto(entityDomain: User): IUserDto {
    return entityDomain
  }
}
