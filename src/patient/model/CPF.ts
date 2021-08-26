import { Either, left, right } from "fp-ts/lib/Either";
import { isValidCpf } from "../validation/cpfValidation";

export type CPF = string;

export const createCPF = (value: string): Either<string, CPF> =>
  isValidCpf(value) ? right(value) : left("Invalid CPF");
