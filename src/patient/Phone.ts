import { isValidPhoneNumber } from "../validation/phoneValidation";
import { ContactUse } from "./ContactUse";

export class Phone {
  use: ContactUse;
  value: string;

  private constructor(use: ContactUse, value: string) {
    this.use = use;
    this.value = value;
  }

  static create(use: ContactUse, value: string): Phone {
    if (isValidPhoneNumber(value)) {
      return new Phone(use, value);
    } else {
      throw Error("Invalid phone number");
    }
  }
}
