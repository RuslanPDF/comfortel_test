import { BaseRepository } from './base.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from '../../../application/common/repositories/IUserRepository.interface';
import { EntityManager } from '@mikro-orm/postgresql';


export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {
  public constructor(ctx: EntityManager) {
    super(ctx, UserSchema);
  }
}
