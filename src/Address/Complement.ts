import { between0and100, BoundedString } from "../patient/BoundedString";

export class Complement {
  value: BoundedString;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Complement {
    return new Complement(between0and100(value));
  }
}
