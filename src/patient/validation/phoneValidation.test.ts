import { isValidPhoneNumber } from "./phoneValidation";

describe("phoneValidation", function () {
  it("should return true for a valid phone number", function () {
    expect(isValidPhoneNumber("+5551999999999")).toBe(true);
  });

  it("should return false for an invalid phone number", function () {
    expect(isValidPhoneNumber("9999999")).toBe(false);
  });

  it("should return false for a single char", function () {
    expect(isValidPhoneNumber("3")).toBe(false);
  });

  it("should return false for an emtpy string", function () {
    expect(isValidPhoneNumber("")).toBe(false);
  });

  it("should return false for an non numeric string", function () {
    expect(isValidPhoneNumber("asdf")).toBe(false);
  });
});
