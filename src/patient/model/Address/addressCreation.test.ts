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
      _tag: "Right",
      right: {
        city: "Poa",
        complement: { _tag: "Some", value: "ap 25" },
        number: 61,
        postalCode: "23490200",
        state: "RS",
        street: "Duplov",
        use: "home",
      },
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
      _tag: "Left",
      left: [
        "Invalid city name",
        "Number must be positive",
        "Invalid postal code",
        "Invalid state",
        "Invalid street name",
        "Invalid address use",
      ],
    });
  });
});
