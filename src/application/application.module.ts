import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { GetUserHandler } from './user/queries/getUser/getUser.handler';


const AUTH_HANDLERS = [GetUserHandler];

@Module({
  imports: [
    CqrsModule,
    PersistenceModule,
  ],
  providers: [...AUTH_HANDLERS],
})
export class ApplicationModule {
}
