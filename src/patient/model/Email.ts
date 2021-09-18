import { Either, left, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { sequenceT } from "fp-ts/lib/Apply";
import { Contact } from "./Contact";

import { makeContactUse } from "./ContactUse";
import { isValidEmail } from "../validation/emailValidation";
import { applicativeValidation } from "../validation/applicativeValidation";
import { ContactUseType } from "../fhir/valueSets";

export type EmailContact = Contact;

export const makeEmail = (s: string): Either<NonEmptyArray<string>, string> =>
  isValidEmail(s) ? right(s) : left(["Invalid email"]);

const toEmailContact = ([email, use]: [
  string,
  ContactUseType
]): EmailContact => ({
  value: email,
  use,
});

export const makeEmailContact = ({
  value,
  use,
}: {
  value: string;
  use: string;
}): Either<NonEmptyArray<string>, EmailContact> =>
  pipe(
    sequenceT(applicativeValidation)(makeEmail(value), makeContactUse(use)),
    map(toEmailContact)
  );
