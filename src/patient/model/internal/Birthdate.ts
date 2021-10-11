import { isBefore, isValid, parseISO } from "date-fns";
import { chain, left, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { ValidationResult } from "./validation/ValidationResult";

// this is not as strict as using `brands`: we can use any date in place of a Birthdate.
// But if we only use the `makeBirthdate` function to create a Birthdate we can be safe
export type Birthdate = Date;

const isValidDate = (d: Date): ValidationResult<Date> =>
  isValid(d) ? right(d) : left(["Invalid date"]);

const isInPast = (d: Date): ValidationResult<Date> =>
  isBefore(d, new Date()) ? right(d) : left(["Birthdate must be in the past"]);

export const makeBirthdate = (d: string): ValidationResult<Birthdate> => {
  return pipe(parseISO(d), isValidDate, chain(isInPast));
};
