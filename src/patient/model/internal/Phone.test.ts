import { makeOptionPhoneContact } from "./Phone";

describe("Phone", () => {
  it("should create a phone from valid DTO", () => {
    expect(
      makeOptionPhoneContact({ value: "51987698765", use: "mobile" })
    ).toStrictEqual({
      _tag: "Right",
      right: {
        _tag: "Some",
        value: { use: "mobile", value: "+5551987698765" },
      },
    });
  });

  it("should return none for undefined", () => {
    expect(makeOptionPhoneContact(undefined)).toStrictEqual({
      _tag: "Right",
      right: {
        _tag: "None",
      },
    });
  });

  it("should return errors for invalid data", () => {
    expect(makeOptionPhoneContact({ value: "3", use: "foo" })).toStrictEqual({
      _tag: "Left",
      left: ["Invalid phone number", "Invalid contact use"],
    });
  });
});
