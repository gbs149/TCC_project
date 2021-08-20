import { PostalCode } from "./PostalCode";
import { AddressUse } from "./AddressUse";
import { AddressNumber } from "./AddressNumber";
import { State } from "./State";
import { Street } from "./Street";
import { City } from "./City";
import { Complement } from "./Complement";

export interface Address {
  city: City;
  complement?: Complement;
  number: AddressNumber;
  postalCode: PostalCode;
  state: State;
  street: Street;
  use: AddressUse;
}
