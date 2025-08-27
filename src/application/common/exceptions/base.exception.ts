export abstract class BaseException {
  protected constructor(
    public status: number,
    public message: string) {}
}
