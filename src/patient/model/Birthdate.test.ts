import { makeBirthdate } from "./Birthdate";

describe("Birthdate", () => {
  it("should", () => {
    const bd = makeBirthdate("2012-03-12");
    expect(bd).toEqual({
      _tag: "Right",
      right: new Date("2012-03-12T03:00:00.000Z"),
    });
  });
});
