import { between0and100, BoundedString } from "../patient/BoundedString";

export class City {
  name: BoundedString;

  private constructor(name: string) {
    this.name = name;
  }

  static create(name: string): City {
    return new City(between0and100(name));
  }
}
