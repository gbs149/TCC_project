import { makeName } from "./Name";

describe("Name", () => {
  it("should create a valid NameContact", function () {
    const e = makeName({
      first: "asdf",
      last: "fdsa",
    });
    expect(e).toStrictEqual({
      _tag: "Right",
      right: { first: "asdf", last: "fdsa" },
    });
  });

  it("should return validation errors for invalid input", function () {
    const e = makeName({
      first: "  ",
      last: "  ",
    });
    expect(e).toStrictEqual({
      _tag: "Left",
      left: ["Invalid first name", "Invalid last name"],
    });
  });
});
