import { Injectable, Scope } from "@nestjs/common";
import { IUnitOfWork } from "../../application/common/repositories/IUnitOfWork.interface";
import { IUserRepository } from "../../application/common/repositories/IUserRepository.interface";
import { UserRepository } from "./repositories/user.repository";
import { EntityManager } from "@mikro-orm/postgresql";


@Injectable({scope: Scope.REQUEST})
export class UnitOfWork implements IUnitOfWork {
  private readonly _ctx: EntityManager;

  public constructor(entityManger: EntityManager) {
    this._ctx = entityManger.fork();
  }

  public async commit(): Promise<void> {
    await this._ctx.flush();
  }

  private _userRepository: UserRepository | null = null;
  public get userRepository(): IUserRepository {
    return this._userRepository ??= new UserRepository(this._ctx);
  }
}
