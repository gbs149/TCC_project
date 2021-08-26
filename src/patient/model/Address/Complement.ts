import { BoundedString, string100 } from "../../../validation/boundedString";
import { none, Option, some } from "fp-ts/lib/Option";
import { Either } from "fp-ts/lib/Either";

export type Complement = Either<string, BoundedString>;

export const createComplement = (value: string): Option<Complement> => {
  return value ? some(string100(value)) : none;
};
