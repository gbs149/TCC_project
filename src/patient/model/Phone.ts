import { sequenceT } from "fp-ts/Apply";
import { Either, left, map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { fromNullable, match, none, Option, some } from "fp-ts/Option";
import { ContactUseType } from "../fhir/valueSets";
import { applicativeValidation } from "../validation/applicativeValidation";
import { isValidPhoneNumber } from "../validation/phoneValidation";
import { Contact } from "./Contact";
import { makeContactUse } from "./ContactUse";
import { PhoneDTO } from "./PhoneDTO";

export type PhoneContact = Contact;

const makePhone = (s: string): Either<NonEmptyArray<string>, string> =>
  isValidPhoneNumber(s) ? right(s) : left(["Invalid phone number"]);

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
}: PhoneDTO): Either<NonEmptyArray<string>, Option<PhoneContact>> =>
  pipe(
    sequenceT(applicativeValidation)(makePhone(value), makeContactUse(use)),
    map(toPhoneContact)
  );

export const makeOptionPhoneContact = (
  p: PhoneDTO
): Either<NonEmptyArray<string>, Option<PhoneContact>> =>
  pipe(
    p,
    fromNullable,
    match(() => right(none), makePhoneContact)
  );
