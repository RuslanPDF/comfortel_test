import { BaseEntity } from '../../../domain/entities/base.entity';
import { IBaseRepository } from '../../../application/common/repositories/IBaseRepository.interface';
import { EntitySchema, GetRepository } from '@mikro-orm/core';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql';


export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  protected _entities: GetRepository<T, SqlEntityRepository<T>>;
  protected _ctx: EntityManager;

  protected constructor(ctx: EntityManager, schema: EntitySchema<T>) {
    this._ctx = ctx;
    this._entities = this._ctx.getRepository(schema);
  }

  public getById(id: number): Promise<T | null> {
    return this._entities.findOne({
      id: id,
    });
  }

  public getByIdOrFail(id: number): Promise<T> {
    return this._entities.findOneOrFail({ id });
  }

  public insert(entity: T): void {
    this._ctx.persist(entity);
  }

  public remove(entity: T): void {
    this._ctx.remove(entity);
  }
}
