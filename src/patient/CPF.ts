import { isValidCpf } from "../validation/cpfValidation";

export class CPF {
  value: string;
  private constructor(value: string) {
    this.value = value;
  }

  // OO way: throw Error is impure
  static create(value: string) {
    if (isValidCpf(value)) {
      return new CPF(value);
    } else {
      throw Error("Invalid CPF");
    }
  }
}
