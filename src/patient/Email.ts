import { ContactUse } from "./ContactUse";
import { emailIsValid } from "../validation/emailValidation";

export class Email {
  use: ContactUse;
  value: string;

  private constructor(use: ContactUse, value: string) {
    this.use = use;
    this.value = value;
  }

  static create(use: ContactUse, value: string): Email {
    if (emailIsValid(value)) {
      return new Email(use, value);
    } else {
      throw Error("Invalid email");
    }
  }
}
