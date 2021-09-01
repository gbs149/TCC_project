import { Either, left, map, right } from "fp-ts/lib/Either";
import { isValidString } from "../../validation/boundedString";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/lib/Apply";
import { applicativeValidation } from "../../validation/applicativeValidation";

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

export const makeName = ({
  first,
  last,
}: {
  first: string;
  last: string;
}): Either<NonEmptyArray<string>, Name> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeValidString("first")(first.trim()),
      makeValidString("last")(last.trim())
    ),
    map(toName)
  );
