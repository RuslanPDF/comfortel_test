import { BaseEntity } from './base.entity';
import { GenderEnum } from '../enum/gender.enum';

export class UserEntity extends BaseEntity {
  public login: string = '';

  public fullName: string = '';

  public gender: GenderEnum = GenderEnum.MALE;

  public age: number = 0;

  public phone: string = '';

  public email: string = '';

  public avatarUrl: string = '';

  public isActive: boolean = true;

  public constructor(
    login: string,
    fullName: string,
    gender: GenderEnum,
    age: number,
    phone: string,
    email: string,
    avatarUrl: string,
    isActive: boolean = true,
  ) {
    super();

    this.login = login;
    this.fullName = fullName;
    this.gender = gender;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.isActive = isActive;
  }
}
