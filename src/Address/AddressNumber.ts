export interface AddressNumber {
  readonly value: number | "s/n";
}

export const createAddressNumber = (num: number | "s/n"): AddressNumber => {
  if (typeof num === "number" && num < 0) {
    throw Error("Number must be positive");
  } else {
    return { value: num };
  }
};
