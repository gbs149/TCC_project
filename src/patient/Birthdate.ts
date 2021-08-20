import { isPast } from "date-fns";

export class Birthdate {
  readonly date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  static create(date: Date): Birthdate {
    if (isPast(date)) {
      return new Birthdate(date);
    } else {
      throw Error("Birthdate must be in the past");
    }
  }
}
