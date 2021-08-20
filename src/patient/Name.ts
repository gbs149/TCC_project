import { between0and100, BoundedString } from "./BoundedString";

export class Name {
  first: BoundedString;
  last: BoundedString;

  private constructor({
    first,
    last,
  }: {
    first: BoundedString;
    last: BoundedString;
  }) {
    this.first = first;
    this.last = last;
  }

  static create({ first, last }: { first: string; last: string }): Name {
    return new Name({
      first: between0and100(first),
      last: between0and100(last),
    });
  }
}
