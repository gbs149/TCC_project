import { AddressDTO } from "./AddressDTO";
import { makeAddress } from "./Address";

describe("Address creation", () => {
  it("should create an Address from a valid DTO", () => {
    const addressDTO: AddressDTO = {
      city: "Poa",
      lines: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Protosia"],
      postalCode: "23490200",
      state: "RS",

      use: "home",
    };

    const address = makeAddress(addressDTO);

    expect(address).toStrictEqual({
      _tag: "Right",
      right: {
        city: "Poa",
        lines: ["Rua Prov. Duplov, 61 apto. 205", "esquina com Protosia"],
        postalCode: "23490200",
        state: "RS",
        use: "home",
      },
    });
  });

  it("should return left for invalid values", () => {
    const addressDTO: AddressDTO = {
      city: "",
      lines: ["Rua Prov. Duplov, 61 apto. 205", ""],
      postalCode: "asdf",
      state: "TS",
      use: "home sweet home",
    };

    const address = makeAddress(addressDTO);

    expect(address).toStrictEqual({
      _tag: "Left",
      left: [
        "Invalid city name",
        "Invalid lines",
        "Invalid postal code",
        "Invalid state",
        "Invalid address use",
      ],
    });
  });
});
