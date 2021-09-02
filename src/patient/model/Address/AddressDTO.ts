export interface AddressDTO {
  city: string;
  lines: string[];
  postalCode: string;
  state: string;
  use: string;
}

export const emptyAddress: AddressDTO = {
  city: "",
  lines: [],
  postalCode: "",
  state: "",
  use: "",
};
