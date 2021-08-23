import { isPast } from "date-fns";

export interface Birthdate {
  readonly value: Date;
}

export const createDate = (date: Date): Birthdate => {
  if (isPast(date)) {
    return { value: date };
  } else {
    throw Error("Birthdate must be in the past");
  }
};
