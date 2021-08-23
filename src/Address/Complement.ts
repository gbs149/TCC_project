import { BoundedString, string100 } from "../validation/BoundedString";

export interface Complement {
  readonly value: BoundedString;
}

export const createComplement = (name: string): Complement => {
  return { value: string100(name) };
};
