import { Either, left, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { sequenceT } from "fp-ts/Apply";
import { Contact } from "./Contact";
import { ContactDTO } from "./ContactDTO";

import { makeContactUse } from "./ContactUse";
import { isValidEmail } from "./validation/emailValidation";
import { applicativeValidation } from "./validation/applicativeValidation";
import { ContactUseType } from "../../fhir/internal/valueSets";

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
}: ContactDTO): Either<NonEmptyArray<string>, EmailContact> =>
  pipe(
    sequenceT(applicativeValidation)(makeEmail(value), makeContactUse(use)),
    map(toEmailContact)
  );
