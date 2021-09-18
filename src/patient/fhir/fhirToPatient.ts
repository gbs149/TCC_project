import { Patient as FhirPatient } from "fhir/r4";
import { getOrElse } from "fp-ts/lib/Option";
import { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
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
  cpf: getOrElse(() => "")(getCpf(fhirPatient)),
  email: getOrElse(() => ({
    value: "",
    use: "",
  }))(getEmail(fhirPatient)),
  phone: getOrElse(() => ({
    value: "",
    use: "",
  }))(getPhone(fhirPatient)),
  name: getName(fhirPatient),
  currentAddress: getCurrentAddress(fhirPatient),
});
