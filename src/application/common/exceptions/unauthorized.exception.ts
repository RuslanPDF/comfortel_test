import { BaseException } from './base.exception';


export class UnauthorizedException extends BaseException {
  public constructor(message: string) {
    super(401, message);
  }
}
