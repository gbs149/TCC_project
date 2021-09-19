import { Address, Patient } from "fhir/r4";
import { head } from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Option";
import { orElse } from "../../../helpers/fp-helpers";
import {
  AddressDTO,
  emptyAddress,
} from "../../model/internal/Address/AddressDTO";
import { findCurrent } from "./helpers/current";

export const getCurrentAddress = (patient: Patient): AddressDTO =>
  pipe(
    findCurrent(patient.address),
    head,
    map(toAddressDTO),
    orElse(emptyAddress)
  );

const toAddressDTO = (address: Address): AddressDTO => ({
  use: address.use,
  postalCode: address.postalCode,
  lines: address.line ?? [],
  city: address.city,
  state: address.state,
});
