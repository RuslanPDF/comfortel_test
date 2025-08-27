import { Query } from '@nestjs/cqrs';
import { GetUserDto } from '../../../common/dto/user/getUser.dto';


export class GetUserQuery extends Query<GetUserDto> {
  public constructor(
    public id: number,
  ) {
    super();
  }
}
