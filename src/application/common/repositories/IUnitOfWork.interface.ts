import { IUserRepository } from "./IUserRepository.interface";


export abstract class IUnitOfWork {
  public abstract commit(): Promise<void>;
  public abstract get userRepository(): IUserRepository;
}
