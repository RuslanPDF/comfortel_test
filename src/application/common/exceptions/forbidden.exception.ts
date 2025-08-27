import { BaseException } from './base.exception';


export class ForbiddenException extends BaseException {
  public constructor(message: string) {
    super(403, message);
  }
}
