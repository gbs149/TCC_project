export class Name {
  first: string;
  last: string;

  private constructor({ first, last }: { first: string; last: string }) {
    this.first = first;
    this.last = last;
  }

  static create({ first, last }: { first: string; last: string }): Name {
    if (first.trim().length > 100)
      throw Error("First name cannot be more than 100 characters long");
    if (first.trim().length <= 0) throw Error("First name cannot be empty");
    if (last.trim().length > 100)
      throw Error("Last name cannot be more than 100 characters long");
    if (last.trim().length <= 0) throw Error("Last name cannot be empty");

    return new Name({ first, last });
  }
}
