import { HttpGet } from '../common/decorators/apiRoutes.decorator';
import { ApiController } from '../common/decorators/apiController.decorator';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../../application/user/queries/getUser/getUser.query';
import { GetUserDto } from '../../application/common/dto/user/getUser.dto';
import { Param, ParseIntPipe } from '@nestjs/common';


@ApiController()
export class UserController {
  public constructor(
    private readonly _cmdBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {
  }

  @HttpGet('me/:id', GetUserDto)
  async getUserStatus(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    const query = new GetUserQuery(id);
    return this._queryBus.execute(query);
  }
}
