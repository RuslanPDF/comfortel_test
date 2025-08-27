import { NestFactory } from '@nestjs/core';
import { MainModule } from './presentation/main.module';
import { ConfigService } from './infrastructure/configuration/configService';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApiResponseFormatInterceptor } from './presentation/common/interceptors/apiResponseFormat.interceptor';
import DataBaseConfig from './mikro-orm.config';
import { DbInitializer } from './infrastructure/persistence/dbInitializer';
import { MikroORM } from '@mikro-orm/postgresql';


class Application {
  private static readonly _validNodeEnvs = [
    'production',
    'stage',
    'development',
  ];

  public static async start(): Promise<void> {
    const { NODE_ENV } = process.env;

    if (NODE_ENV == null || !this._validNodeEnvs.includes(NODE_ENV)) {
      throw new Error(
        `Invalid application environment was provided: ${NODE_ENV}`,
      );
    }

    const app = await NestFactory.create(MainModule);

    const cfgService = app.get(ConfigService);
    await this.runMigrations();
    await this.runDbInit(cfgService);
    this.addSwagger(app);
    this.addMiddlewares(app);

    //
    // if (process.env.NODE_ENV !== "production") {
    //   await this.addSwagger(app);
    // }

    app.setGlobalPrefix('api');
    app.enableCors();

    await app.listen(cfgService.appPort);
  }

  private static async runDbInit(cfgService: ConfigService): Promise<void> {
    const orm = await MikroORM.init(DataBaseConfig);
    await DbInitializer.run(orm.em.fork(), cfgService);
  }

  private static async runMigrations(): Promise<void> {
    const orm = await MikroORM.init(DataBaseConfig);

    const migrator = orm.getMigrator();

    await migrator.up();
    await orm.close();
  }

  private static addMiddlewares(app: INestApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(new ApiResponseFormatInterceptor());
  }

  private static addSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('My Project')
      .setContact('Ruslan Muratbekov', '', 'ruslanmuratbekov2004@gmail.com')
      .setVersion('0.0.1')
      .addServer('/api')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
  }
}

Application.start()
  .then(() => console.log(0))
  .catch((e) => console.log(e));
