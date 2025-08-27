import { BaseException } from './base.exception';


export class BadRequestException extends BaseException {
  public constructor(message: string) {
    super(400, message);
  }
}
