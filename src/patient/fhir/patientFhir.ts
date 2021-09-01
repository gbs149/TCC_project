import { Patient } from "fhir/r4";
import { PatientModel } from "../model/PatientModel";

import { map } from "fp-ts/lib/Either";
import { getOrElse } from "fp-ts/lib/Option";
import { AddressUseType, ContactUseType, GenderType } from "./useTypes";

export const fromModel = (p: PatientModel): Patient => ({
  resourceType: "Patient",
  id: p.id,
  active: p.active,
  address: [
    {
      city: p.currentAddress.city,
      line: [
        `${p.currentAddress.street}, ${p.currentAddress.number} ${getOrElse(
          () => ""
        )(p.currentAddress.complement)}`,
      ],
      postalCode: p.currentAddress.postalCode,
      state: p.currentAddress.state,
      use: p.currentAddress.use as AddressUseType,
    },
  ],
  birthDate: p.birthdate.toISOString(),
  gender: p.gender as GenderType, // uhghhh
  identifier: [
    {
      system: "http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf",
      value: p.cpf,
    },
  ],
  name: [{ use: "usual", given: p.name.first.split(" "), family: p.name.last }],

  telecom: [
    {
      system: "phone",
      use: p.phone.use,
      value: p.phone.value,
    },
    {
      system: "email",
      use: p.email.use,
      value: p.email.value,
    },
  ],
});

export const fromValidatedModel = map(fromModel);
