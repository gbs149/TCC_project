import { right } from "fp-ts/Either";
import { makeEmailContact } from "./Email";

describe("Email", () => {
  it("should a valid EmailContact", function () {
    const e = makeEmailContact({
      value: "foo@bar.com",
      use: "home",
    });
    expect(e).toStrictEqual(right({ use: "home", value: "foo@bar.com" }));
  });

  it("should return validation errors for invalid input", function () {
    const e = makeEmailContact({
      value: "foo@bar",
      use: "hommey",
    });
    expect(e).toStrictEqual({
      _tag: "Left",
      left: ["Invalid email", "Invalid contact use"],
    });
  });
});
