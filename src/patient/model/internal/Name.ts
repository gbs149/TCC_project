import { sequenceT } from "fp-ts/Apply";
import { Either, left, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { NameDTO } from "../../DTOs/NameDTO";
import { applicativeValidation } from "./validation/applicativeValidation";
import { isValidString } from "./validation/boundedString";

export interface Name {
  readonly first: string;
  readonly last: string;
}

const makeValidString =
  (n: string) =>
  (s: string): Either<NonEmptyArray<string>, string> =>
    isValidString(s) ? right(s) : left([`Invalid ${n} name`]);

const toName = ([first, last]: [string, string]): Name => ({
  first,
  last,
});

export const makeName = (name: NameDTO): Either<NonEmptyArray<string>, Name> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeValidString("first")(name?.first.trim()),
      makeValidString("last")(name?.last.trim())
    ),
    map(toName)
  );
