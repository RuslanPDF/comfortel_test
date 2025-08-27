import { ApiProperty } from '@nestjs/swagger';


export class BaseDto {
  @ApiProperty()
  public id: number = 0;

  @ApiProperty()
  public createdAt: Date = new Date();

  @ApiProperty()
  public updatedAt: Date = new Date();

  public constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
