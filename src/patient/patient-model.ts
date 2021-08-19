// First draft of a patient model with some requirements

interface PatientModel {
  // UUID
  id: string;

  active: boolean;

  name: {
    // max 100 char
    first: string;
    // max 100 char
    last: string;
  };

  // valid cpf
  cpf: string;

  // in the past
  birthdate: Date;

  // male | female | other | unknown
  gender: string;

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
