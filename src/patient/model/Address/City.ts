import { BoundedString, string100 } from "../../../validation/boundedString";
import { Either } from "fp-ts/lib/Either";

export type City = BoundedString;

export const createCity = (name: string): Either<string, City> =>
  string100(name);
