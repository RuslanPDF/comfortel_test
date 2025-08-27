import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Scope } from '@nestjs/common';
import { IUnitOfWork } from '../../../common/repositories/IUnitOfWork.interface';
import { GetUserQuery } from './getUser.query';
import { IUserRepository } from '../../../common/repositories/IUserRepository.interface';
import { GetUserDto } from '../../../common/dto/user/getUser.dto';


@QueryHandler(GetUserQuery, { scope: Scope.REQUEST })
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  private readonly _userRepository: IUserRepository;

  public constructor(_unitOfWork: IUnitOfWork) {
    this._userRepository = _unitOfWork.userRepository;
  }

  public async execute(query: GetUserQuery): Promise<GetUserDto> {
    let user = await this._userRepository.getByIdOrFail(query.id);

    return new GetUserDto(
      user.login,
      user.fullName,
      user.gender,
      user.age,
      user.phone,
      user.email,
      user.avatarUrl,
      user.isActive,
      user.id,
      user.createdAt,
      user.updatedAt,
    );
  }
}
