import { AddressDTO } from "./internal/Address/AddressDTO";
import { PhoneDTO } from "./internal/PhoneDTO";

export interface PatientDTO {
  id?: string;
  active?: boolean;
  birthdate: string;
  cpf: string;
  email: { value: string; use: string };
  gender: string;
  name: { first: string; last: string };
  phone?: PhoneDTO;
  currentAddress: AddressDTO;
}
