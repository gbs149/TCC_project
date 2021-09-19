import { Patient as FhirPatient } from "fhir/r4";
import { Either } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { toNullable } from "fp-ts/Option";
import { orElse } from "../../helpers/fp-helpers";
import { emptyContactDTO } from "../model/internal/ContactDTO";
import { PatientDTO } from "../model/PatientDTO";
import { createPatient, PatientModel } from "../model/PatientModel";
import { getCurrentAddress } from "./internal/address";
import { getCpf } from "./internal/cpf";
import { getName } from "./internal/name";
import { getEmail, getPhone } from "./internal/telecom";

export const fromFhir = (
  fhirPatient: FhirPatient
): Either<NonEmptyArray<string>, PatientModel> =>
  pipe(fromFhirToDTO(fhirPatient), createPatient);

const fromFhirToDTO = (fhirPatient: FhirPatient): PatientDTO => ({
  id: fhirPatient.id,
  active: fhirPatient.active,
  gender: fhirPatient.gender,
  birthdate: fhirPatient.birthDate,
  cpf: pipe(getCpf(fhirPatient), orElse("")),
  email: pipe(getEmail(fhirPatient), orElse(emptyContactDTO)),
  phone: pipe(getPhone(fhirPatient), toNullable),
  name: getName(fhirPatient),
  currentAddress: getCurrentAddress(fhirPatient),
});
