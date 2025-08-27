import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/configuration/configModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { PersistenceModule } from '../infrastructure/persistence/persistence.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    ConfigModule,
    CqrsModule.forRoot(),
    ApplicationModule,
    PersistenceModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class MainModule {
}
