import { isBefore, isValid, parseISO } from "date-fns";
import { chain, Either, left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

// this is not as strict as using `brands`: we can use any date in place of a Birthdate.
// But if we only use the `makeBirthdate` function to create a Birthdate we can be safe
export type Birthdate = Date;

const isValidDate = (d: Date): Either<NonEmptyArray<string>, Date> =>
  isValid(d) ? right(d) : left(["Invalid date"]);

const isInPast = (d: Date): Either<NonEmptyArray<string>, Date> =>
  isBefore(d, new Date()) ? right(d) : left(["Birthdate must be in the past"]);

export const makeBirthdate = (
  d: string
): Either<NonEmptyArray<string>, Birthdate> => {
  return pipe(parseISO(d), isValidDate, chain(isInPast));
};
