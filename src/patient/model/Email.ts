import { Either, left, right } from "fp-ts/lib/Either";

import { isValidEmail } from "../validation/emailValidation";

export interface Email {
  readonly use: string;
  readonly value: string;
}

export const createEmail = ({
  value,
  use,
}: {
  value: string;
  use: string;
}): Either<string, Email> =>
  isValidEmail(value) ? right({ value, use }) : left("Invalid email");
