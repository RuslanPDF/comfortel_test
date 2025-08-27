export class FormatError extends Error {
  constructor(value: Object, conversionType: Object) {
    super(
      `The value of ${value} has an incorrect format of type ${conversionType.constructor.name}`,
    );
  }
}
