import { isValidCpf } from "../validation/cpfValidation";

export interface CPF {
  readonly value: string;
}

export const createCPF = (value: string): CPF => {
  if (isValidCpf(value)) {
    return { value };
  } else {
    throw Error("Invalid CPF");
  }
};
