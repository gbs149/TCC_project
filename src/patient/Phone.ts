import { Either, left, right } from "fp-ts/lib/Either";
import { isValidPhoneNumber } from "../validation/phoneValidation";
import { isContactUse } from "./ContactUse";

export interface Phone {
  readonly use: string;
  readonly value: string;
}

export const createPhone = ({
  value,
  use,
}: {
  value: string;
  use: string;
}): Either<string, Phone> =>
  !isValidPhoneNumber(value)
    ? left("Invalid phone number")
    : !isContactUse(use)
    ? left("Not a valid contact use")
    : right({ value, use });
