import { left, right } from "fp-ts/Either";
import { isValidCpf } from "./validation/cpfValidation";
import { ValidationResult } from "./validation/ValidationResult";

interface CPFBrand {
  readonly CPF: unique symbol;
}

export type CPF = string & CPFBrand;

const isCPF = (s: string): s is CPF => isValidCpf(s);

export const makeCPF = (s: string): ValidationResult<CPF> =>
  isCPF(s) ? right(s) : left(["Invalid CPF"]);
