import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { isBefore, isValid, parseISO } from "date-fns";

interface BirthdateBrand {
  readonly Birthdate: unique symbol;
}

export type Birthdate = Date & BirthdateBrand;

const isValidBirthdate = (d: Date): d is Birthdate =>
  isValid(d) && isBefore(d, new Date());

export const makeBirthdate = (
  d: string
): Either<NonEmptyArray<string>, Birthdate> => {
  const date = parseISO(d);
  return isValidBirthdate(date) ? right(date) : left(["Invalid birthdate"]);
};
