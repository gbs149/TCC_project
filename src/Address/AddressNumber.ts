export class AddressNumber {
  readonly num: number | "s/n";

  private constructor(num: number | "s/n") {
    this.num = num;
  }

  static create(num: number | "s/n"): AddressNumber {
    if (typeof num && num < 0) {
      throw Error("Number must be positive");
    } else {
      return new AddressNumber(num);
    }
  }
}
