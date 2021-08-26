import { AddressDTO } from "../Address/AddressDTO";

export interface PatientDTO {
  id: string;
  active: boolean;
  birthdate: string;
  cpf: string;
  email: { value: string; use: string };
  gender: string;
  name: { first: string; last: string };
  phone: { value: string; use: string }[];
  currentAddress: AddressDTO;
}
