import { BaseEntity } from "../../../domain/entities/base.entity";
import { EntitySchema } from "@mikro-orm/core";

export const BaseSchema = new EntitySchema<BaseEntity>({
  class: BaseEntity,
  abstract: true,
  properties: {
    id: {
      primary: true,
      type: "numeric",
      autoincrement: true
    },
    createdAt: {
      type: "Date",
      onCreate: (): Date => new Date()
    },
    updatedAt: {
      type: "Date",
      onCreate: (): Date => new Date(),
      onUpdate: (): Date => new Date()
    }
  }
});
