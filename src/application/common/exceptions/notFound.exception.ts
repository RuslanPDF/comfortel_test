import { BaseException } from './base.exception';


export class NotFoundException extends BaseException {
  public constructor(message: string) {
    super(404, message);
  }
}
