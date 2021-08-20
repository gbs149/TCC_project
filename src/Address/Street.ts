import { between0and100, BoundedString } from "../patient/BoundedString";

export class Street {
  name: BoundedString;

  private constructor(name: string) {
    this.name = name;
  }

  static create(name: string): Street {
    return new Street(between0and100(name));
  }
}
