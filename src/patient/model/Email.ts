import { Either, left, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { sequenceT } from "fp-ts/lib/Apply";

import { makeContactUse } from "./ContactUse";
import { isValidEmail } from "../../validation/emailValidation";
import { applicativeValidation } from "../../validation/applicativeValidation";
import { ContactUseType } from "../fhir/useTypes";

export const makeEmail = (s: string): Either<NonEmptyArray<string>, string> =>
  isValidEmail(s) ? right(s) : left(["Invalid email"]);

export type EmailContact = {
  readonly use: ContactUseType;
  readonly value: string;
};

const toEmailContact = ([email, use]: [
  string,
  ContactUseType
]): EmailContact => ({
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
