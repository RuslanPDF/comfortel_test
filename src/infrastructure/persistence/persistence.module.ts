import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UnitOfWork } from './unitOfWork';
import DataBaseConfig from '../../mikro-orm.config';
import { IUnitOfWork } from '../../application/common/repositories/IUnitOfWork.interface';


@Module({
  imports: [
    MikroOrmModule.forRoot(DataBaseConfig),
  ],
  providers: [
    {
      provide: IUnitOfWork,
      useClass: UnitOfWork,
    },
  ],
  exports: [IUnitOfWork],
})
export class PersistenceModule {
}
