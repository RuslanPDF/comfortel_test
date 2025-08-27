import { IBaseRepository } from './IBaseRepository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';


export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
