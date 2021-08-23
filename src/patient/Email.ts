import { ContactUse } from "./ContactUse";
import { emailIsValid } from "../validation/emailValidation";

export interface Email {
  readonly use: ContactUse;
  readonly value: string;
}

export const createEmail = (value: string, use: ContactUse): Email => {
  if (emailIsValid(value)) {
    return { value, use };
  } else {
    throw Error("Invalid email");
  }
};
