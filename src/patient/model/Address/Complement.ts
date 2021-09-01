import { isValidString } from "../../../validation/boundedString";
import { none, Option, some } from "fp-ts/lib/Option";

interface ComplementBrand {
  readonly Complement: unique symbol;
}

export type Complement = string & ComplementBrand;

const isValidComplement = (s: string): s is Complement => s && isValidString(s);

export const makeComplement = (s: string): Option<Complement> => {
  return isValidComplement(s) ? some(s) : none;
};
