import { Patient as FhirPatient } from "fhir/r4";
import { map } from "fp-ts/lib/Either";
import { CPF_NAMING_SYSTEM } from "../../constants/constants";
import { PatientModel } from "../model/PatientModel";
import { AddressUseType, GenderType } from "./valueSets";

export const fromModel = (patient: PatientModel): FhirPatient => ({
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
  birthDate: patient.birthdate.toISOString(),
  gender: patient.gender as GenderType, // uhghhh
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

  telecom: [
    {
      system: "phone",
      use: patient.phone.use,
      value: patient.phone.value,
    },
    {
      system: "email",
      use: patient.email.use,
      value: patient.email.value,
    },
  ],
});

export const fromValidatedModel = map(fromModel);
