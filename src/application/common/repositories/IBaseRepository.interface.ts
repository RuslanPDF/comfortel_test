import { BaseEntity } from '../../../domain/entities/base.entity';


export abstract class IBaseRepository<TEntity extends BaseEntity> {
  public abstract insert(entity: TEntity): void;
  public abstract remove(entity: TEntity): void;
  public abstract getById(id: number): Promise<TEntity | null>;
  public abstract getByIdOrFail(id: number): Promise<TEntity>;
}
