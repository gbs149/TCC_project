import { isValidPhoneNumber } from "../validation/phoneValidation";
import { ContactUse } from "./ContactUse";

export interface Phone {
  readonly use: ContactUse;
  readonly value: string;
}

export const createPhone = (value: string, use: ContactUse): Phone => {
  if (isValidPhoneNumber(value)) {
    return { value, use };
  } else {
    throw Error("Invalid phone number");
  }
};
