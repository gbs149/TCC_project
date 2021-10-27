import { sequenceT } from "fp-ts/Apply";
import { left, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { fromNullable, match, none, Option, some } from "fp-ts/Option";
import { ContactDTO } from "../../DTOs/ContactDTO";
import { ContactUseType } from "../../fhir/internal/valueSets/contact";
import { Contact } from "./Contact";
import { makeContactUse } from "./ContactUse";
import { applicativeValidation } from "./validation/applicativeValidation";
import {
  formatPhoneNumber,
  isValidPhoneNumber,
} from "./validation/phoneValidation";
import { ValidationResult } from "./validation/ValidationResult";

export type PhoneContact = Contact;

const makePhone = (s: string): ValidationResult<string> =>
  isValidPhoneNumber(s)
    ? right(formatPhoneNumber(s))
    : left(["Invalid phone number"]);

const toPhoneContact = ([phone, use]: [
  string,
  ContactUseType
]): Option<PhoneContact> =>
  some({
    value: phone,
    use,
  });

const makePhoneContact = ({
  value,
  use,
}: ContactDTO): ValidationResult<Option<PhoneContact>> =>
  pipe(
    sequenceT(applicativeValidation)(makePhone(value), makeContactUse(use)),
    map(toPhoneContact)
  );

export const makeOptionPhoneContact = (
  p: ContactDTO
): ValidationResult<Option<PhoneContact>> =>
  pipe(
    p,
    fromNullable,
    match(() => right(none), makePhoneContact)
  );
