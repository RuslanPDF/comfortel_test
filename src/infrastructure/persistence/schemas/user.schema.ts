import { BaseSchema } from './base.schema';
import { BaseEntity } from '../../../domain/entities/base.entity';
import { UserEntity } from '../../../domain/entities/user.entity';
import { GenderEnum } from '../../../domain/enum/gender.enum';
import { EntitySchema } from '@mikro-orm/core';

export const UserSchema = new EntitySchema<UserEntity, BaseEntity>({
  class: UserEntity,
  extends: BaseSchema,
  properties: {
    login: {
      type: 'string',
      unique: true,
    },
    fullName: {
      type: 'string',
    },
    gender: {
      enum: true,
      items: () => GenderEnum,
      type: 'string',
    },
    age: {
      type: 'number',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
      unique: true,
    },
    avatarUrl: {
      type: 'string',
      nullable: true,
    },
    isActive: {
      type: 'boolean',
      default: true,
    },
  },
});
