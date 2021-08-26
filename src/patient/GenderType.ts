import { either } from "fp-ts";

const genderTypes = ["male", "female", "other", "unknown"];

export type GenderType = string;

export const genderType = (val: string): either.Either<string, GenderType> =>
  genderTypes.includes(val)
    ? either.right(val)
    : either.left("Not a gender type");
