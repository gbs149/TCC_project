export class PostalCode {
  readonly postalCode: string;

  private constructor(postalCode: string) {
    this.postalCode = postalCode;
  }

  static create(postalCode: string): PostalCode {
    if (isValid(postalCode)) {
      return new PostalCode(postalCode);
    } else {
      throw Error("Invalid postal code");
    }
  }
}

// 8 consecutive digits
const postalCodeRegex = /^\d{8}$/;

const isValid = (postalCode: string): boolean =>
  postalCodeRegex.test(postalCode);
