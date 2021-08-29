import { Either, left, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { sequenceT } from "fp-ts/lib/Apply";

import { makeContactUse } from "./ContactUse";
import { isValidEmail } from "../../validation/emailValidation";
import { applicativeValidation } from "../../validation/applicativeValidation";

export const makeEmail = (s: string): Either<NonEmptyArray<string>, string> =>
  isValidEmail(s) ? right(s) : left(["Invalid email"]);

export type EmailContact = {
  readonly use: string;
  readonly value: string;
};

const toEmailContact = ([email, use]: [string, string]): EmailContact => ({
  value: email,
  use,
});

export const makeEmailContact = ({
  email,
  use,
}: {
  email: string;
  use: string;
}): Either<NonEmptyArray<string>, EmailContact> =>
  pipe(
    sequenceT(applicativeValidation)(makeEmail(email), makeContactUse(use)),
    map(toEmailContact)
  );
