import { AddressDTO } from "./AddressDTO";
import { makeAddress } from "./Address";

describe("Address creation", () => {
  it("should create an Address from a valid DTO", () => {
    const addressDTO: AddressDTO = {
      city: "Poa",
      complement: "ap 25",
      number: 61,
      postalCode: "23490200",
      state: "RS",
      street: "Duplov",
      use: "home",
    };

    const address = makeAddress(addressDTO);

    expect(address).toStrictEqual({
      city: { _tag: "Right", right: "Poa" },
      complement: { _tag: "Some", value: { _tag: "Right", right: "ap 25" } },
      number: { _tag: "Right", right: 61 },
      postalCode: { _tag: "Right", right: "23490200" },
      state: { _tag: "Right", right: "RS" },
      street: { _tag: "Right", right: "Duplov" },
      use: { _tag: "Right", right: "home" },
    });
  });

  it("should return left for invalid values", () => {
    const addressDTO: AddressDTO = {
      city: "",
      number: -61,
      postalCode: "asdf",
      state: "TS",
      street: "",
      use: "home sweet home",
    };

    const address = makeAddress(addressDTO);

    expect(address).toStrictEqual({
      city: { _tag: "Left", left: "String cannot shorter than 1 character" },
      complement: { _tag: "None" },
      number: { _tag: "Left", left: "Number must be positive" },
      postalCode: { _tag: "Left", left: "Invalid postal code" },
      state: { _tag: "Left", left: "Not a state" },
      street: { _tag: "Left", left: "String cannot shorter than 1 character" },
      use: { _tag: "Left", left: "Invalid address use" },
    });
  });
});
