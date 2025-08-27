import { Migration } from '@mikro-orm/migrations';

export class Migration20250827130523 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_entity" ("id" serial, "created_at" timestamptz not null, "updated_at" timestamptz not null, "login" varchar(255) not null, "full_name" varchar(255) not null, "gender" text check ("gender" in ('male', 'female', 'other')) not null, "age" int not null, "phone" varchar(255) not null, "email" varchar(255) not null, "avatar_url" varchar(255) null, "is_active" boolean not null default true, constraint "user_entity_pkey" primary key ("id"));`);
    this.addSql(`alter table "user_entity" add constraint "user_entity_login_unique" unique ("login");`);
    this.addSql(`alter table "user_entity" add constraint "user_entity_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_entity" cascade;`);
  }

}
