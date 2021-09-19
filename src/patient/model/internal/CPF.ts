import { Either, left, right } from "fp-ts/Either";
import { isValidCpf } from "./validation/cpfValidation";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";

interface CPFBrand {
  readonly CPF: unique symbol;
}

export type CPF = string & CPFBrand;

const isCPF = (s: string): s is CPF => isValidCpf(s);

export const makeCPF = (s: string): Either<NonEmptyArray<string>, CPF> =>
  isCPF(s) ? right(s) : left(["Invalid CPF"]);
