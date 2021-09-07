import { makeBirthdate } from "./Birthdate";

describe("Birthdate", () => {
  it("should create a BirthDate from a valid ISO date string", () => {
    const birthdate = makeBirthdate("2012-03-12");
    expect(birthdate).toStrictEqual({
      _tag: "Right",
      right: new Date("2012-03-12T03:00:00.000Z"),
    });
  });

  it("should return left when given invalid ISO date string", () => {
    const birthdate = makeBirthdate("2012/03/12");
    expect(birthdate).toStrictEqual({ _tag: "Left", left: ["Invalid date"] });
  });

  it("should return left when given date is not in the past", () => {
    const birthdate = makeBirthdate("2099-03-12");
    expect(birthdate).toStrictEqual({
      _tag: "Left",
      left: ["Birthdate must be in the past"],
    });
  });
});
