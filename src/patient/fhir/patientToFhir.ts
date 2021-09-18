import { ContactPoint, Patient as FhirPatient } from "fhir/r4";
import { concat, fromOption } from "fp-ts/Array";
import { map } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as Option from "fp-ts/Option";
import { CPF_NAMING_SYSTEM } from "../../constants/constants";
import { Contact } from "../model/internal/Contact";
import { PatientModel } from "../model/PatientModel";
import { toTelecom } from "./internal/helpers/telecom";
import { AddressUseType } from "./internal/valueSets";

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

export const fromValidatedModel = map(fromModel);
