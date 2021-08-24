import { BoundedString, string100 } from "../validation/boundedString";
import { Either } from "fp-ts/lib/Either";

export type Street = BoundedString;

export const createStreet = (name: string): Either<string, Street> =>
  string100(name);
