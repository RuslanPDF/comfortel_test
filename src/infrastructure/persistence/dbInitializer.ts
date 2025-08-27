import { ConfigService } from '../configuration/configService';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from '../../domain/entities/user.entity';
import { GenderEnum } from '../../domain/enum/gender.enum';

export class DbInitializer {
  public static async run(em: EntityManager, cfgService: ConfigService): Promise<void> {
    const adminLogin = 'ADMIN';

    const existingAdmin = await em.findOne(UserEntity, { login: adminLogin });
    if (existingAdmin) {
      return;
    }

    const admin = new UserEntity(
      adminLogin,
      'test test',
      GenderEnum.MALE,
      199,
      '+8123123',
      'asdas@gmail.com',
      'asdasd.com',
      true,
    );

    await em.persistAndFlush(admin);
  }
}
