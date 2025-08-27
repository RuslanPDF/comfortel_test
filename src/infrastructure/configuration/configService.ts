import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { FormatError } from '../../domain/errors/FormatError';

@Injectable()
export class ConfigService {
  constructor(private readonly _configuration: NestConfigService) {
  }

  get appPort(): number {
    return this.readInt('APP_PORT');
  }

  get dbName(): string {
    return this.readString('DB_NAME');
  }

  get dbHost(): string {
    return this.readString('DB_HOST');
  }

  get dbPort(): number {
    return this.readInt('DB_PORT');
  }

  get dbUsername(): string {
    return this.readString('DB_USERNAME');
  }

  get dbPassword(): string {
    return this.readString('DB_PASSWORD');
  }

  private readString(propertyName: string): string {
    const value = this._configuration.get<string>(propertyName);
    if (value === undefined || value === null) {
      throw new FormatError(`${propertyName} is undefined`, String);
    }
    return value;
  }

  private readInt(propertyName: string): number {
    const value = this.readString(propertyName);
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new FormatError(value, Number);
    }
    return parsed;
  }

  private readFloat(propertyName: string): number {
    const value = this.readString(propertyName);
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      throw new FormatError(value, Number);
    }
    return parsed;
  }

  private readBool(propertyName: string): boolean {
    const value = this.readString(propertyName).toLowerCase();
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new FormatError(value, Boolean);
  }
}
