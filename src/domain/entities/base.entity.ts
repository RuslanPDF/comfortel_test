import { BaseEntity as MikroORMBaseEntity } from '@mikro-orm/core';


export abstract class BaseEntity extends MikroORMBaseEntity {
  public id!: number;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
}
