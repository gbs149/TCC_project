import { sequenceT } from "fp-ts/Apply";
import { Either, left, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { ContactDTO } from "../../DTOs/ContactDTO";
import { ContactUseType } from "../../fhir/internal/valueSets";
import { Contact } from "./Contact";
import { makeContactUse } from "./ContactUse";
import { applicativeValidation } from "./validation/applicativeValidation";
import { isValidEmail } from "./validation/emailValidation";

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
