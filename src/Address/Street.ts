import { BoundedString, string100 } from "../validation/BoundedString";

export interface Street {
  readonly value: BoundedString;
}

export const createStreet = (name: string): Street => {
  return { value: string100(name) };
};
