import { BoundedString, string100 } from "../validation/BoundedString";

export interface City {
  readonly value: BoundedString;
}

export const createCity = (name: string): City => {
  return { value: string100(name) };
};
