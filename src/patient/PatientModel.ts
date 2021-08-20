// First draft of a patient model with some requirements

import { Gender } from "./Gender";
import { CPF } from "./CPF";
import { Birthdate } from "./Birthdate";
import { Id } from "./Id";
import { Active } from "./Active";
import { Name } from "./Name";
import { Phone } from "./Phone";
import { ContactUse } from "./ContactUse";
import { Email } from "./Email";

export interface PatientModel {
  id: Id;
  active: Active;
  birthdate: Birthdate;
  cpf: CPF;
  email: Email;
  gender: Gender;
  name: Name;
  phone: Phone[];

  currentAddress: {
    // valid CEP
    postalCode: string;
    street: string;
    number: number;
    complement?: string;
    // existing city
    city: string;
    // existing state
    state: string;
    // type of address
    use: string;
  };
}
