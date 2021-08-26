import { isPast } from "date-fns";
import { Either, left, right } from "fp-ts/lib/Either";

export type Birthdate = Date;

export const createBirthdate = (date: Date): Either<string, Date> =>
  isPast(date) ? right(date) : left("Birthdate must be in the past");
