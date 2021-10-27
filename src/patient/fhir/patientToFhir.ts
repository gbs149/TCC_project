import { Patient as FhirPatient } from "fhir/r4";
import { map } from "fp-ts/Either";
import { CPF_NAMING_SYSTEM } from "../../constants/constants";
import { PatientModel } from "../model/PatientModel";
import { toTelecom } from "./internal/helpers/telecom";
import { AddressUseType } from "./internal/valueSets/addressUse";

export const fromModelToFhir = (patient: PatientModel): FhirPatient => ({
  resourceType: "Patient",
  id: patient.id,
  active: patient.active,
  address: [
    {
      city: patient.currentAddress.city,
      line: patient.currentAddress.lines,
      postalCode: patient.currentAddress.postalCode,
      state: patient.currentAddress.state,
      use: patient.currentAddress.use as AddressUseType,
    },
  ],
  // TODO: format string to "YYYY-MM-DD"
  birthDate: patient.birthdate.toISOString(),
  gender: patient.gender,
  identifier: [
    {
      system: CPF_NAMING_SYSTEM,
      value: patient.cpf,
    },
  ],
  name: [
    {
      use: "usual",
      given: patient.name.first.split(" "),
      family: patient.name.last,
    },
  ],

  telecom: toTelecom(patient),
});

export const fromValidatedModel = map(fromModelToFhir);
