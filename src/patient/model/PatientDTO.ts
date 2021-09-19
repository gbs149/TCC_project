import { AddressDTO } from "./internal/Address/AddressDTO";
import { ContactDTO } from "./internal/ContactDTO";

export interface PatientDTO {
  id?: string;
  active: boolean;
  birthdate: string;
  cpf: string;
  email: { value: string; use: string };
  gender: string;
  name: { first: string; last: string };
  phone?: ContactDTO;
  currentAddress: AddressDTO;
}
