import { makeLines } from "./Line";

describe("Line", () => {
  it("should create Line[] from valid strings", () => {
    expect(makeLines(["asdf", "fdsa"])).toStrictEqual({
      _tag: "Right",
      right: ["asdf", "fdsa"],
    });
  });

  it("should return Left for invalid strings", () => {
    expect(makeLines(["", "fdsa"])).toStrictEqual({
      _tag: "Left",
      left: ["Invalid lines"],
    });
  });
});
