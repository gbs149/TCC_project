// First draft of a patient model with some requirements

import { Gender } from "./Gender";
import { CPF } from "./CPF";

export interface PatientModel {
  id: string;
  active: boolean;
  gender: Gender;

  name: {
    // min 1, max 100 char
    first: string;
    // min 1, max 100 char
    last: string;
  };

  // valid cpf
  cpf: CPF;

  // in the past
  birthdate: Date;

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

  phone: {
    // type
    use: string;
    // valid phone number
    value: string;
  }[];

  email: {
    // type
    use: string;
    // valid email
    value: string;
  };
}
