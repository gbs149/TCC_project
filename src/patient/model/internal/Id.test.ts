import { makeId } from "./Id";

describe("Id", () => {
  it("should create a valid Id", () => {
    const id =
      "e378b8b7-e217-4543-b401-6b23d0537d47e378b8b7.e217-4543-b401-6b23";
    expect(makeId(id)).toStrictEqual({
      _tag: "Right",
      right: id,
    });
  });

  it("should create a valid single digit Id", () => {
    const id = "9";
    expect(makeId(id)).toStrictEqual({
      _tag: "Right",
      right: id,
    });
  });

  it("should not allow empty id", () => {
    expect(makeId("")).toStrictEqual({
      _tag: "Left",
      left: ["Invalid id"],
    });
  });

  it("should not allow id longer than 64 chars", () => {
    expect(
      makeId(
        "e378b8b7-e217-4543-b401-6b23d0537d47e378b8b7-e217-4543-b401-6b23d"
      )
    ).toStrictEqual({
      _tag: "Left",
      left: ["Invalid id"],
    });
  });

  it("should not allow id with invalid chars", () => {
    expect(makeId("123abc!@#")).toStrictEqual({
      _tag: "Left",
      left: ["Invalid id"],
    });
  });
});
