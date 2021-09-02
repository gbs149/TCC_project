import { Either, left, map, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/lib/Apply";

import { makeContactUse } from "./ContactUse";
import { isValidPhoneNumber } from "../../validation/phoneValidation";
import { applicativeValidation } from "../../validation/applicativeValidation";
import { ContactUseType } from "../fhir/valueSets";

export const makePhone = (s: string): Either<NonEmptyArray<string>, string> =>
  isValidPhoneNumber(s) ? right(s) : left(["Invalid phone number"]);

export interface PhoneContact {
  readonly use: ContactUseType;
  readonly value: string;
}

const toPhoneContact = ([phone, use]: [
  string,
  ContactUseType
]): PhoneContact => ({
  value: phone,
  use,
});

export const makePhoneContact = ({
  value,
  use,
}: {
  value: string;
  use: string;
}): Either<NonEmptyArray<string>, PhoneContact> =>
  pipe(
    sequenceT(applicativeValidation)(makePhone(value), makeContactUse(use)),
    map(toPhoneContact)
  );
