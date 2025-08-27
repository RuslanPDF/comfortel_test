import { BaseDto } from '../base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../../domain/enum/gender.enum';

export class GetUserDto extends BaseDto {
  @ApiProperty()
  public login!: string;

  @ApiProperty()
  public fullName!: string;

  @ApiProperty()
  public gender!: GenderEnum;

  @ApiProperty()
  public age!: number;

  @ApiProperty()
  public phone!: string;

  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public avatarUrl!: string;

  @ApiProperty()
  public isActive!: boolean;

  public constructor(
    login: string,
    fullName: string,
    gender: GenderEnum,
    age: number,
    phone: string,
    email: string,
    avatarUrl: string,
    isActive: boolean,
    id: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
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