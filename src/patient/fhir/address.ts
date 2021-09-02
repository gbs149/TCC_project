import { Address, Patient } from "fhir/r4";
import { findFirst } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { getOrElse, map } from "fp-ts/lib/Option";
import { AddressDTO, emptyAddress } from "../model/Address/AddressDTO";
import { findCurrent } from "./current";

export const getCurrentAddress = (patient: Patient): AddressDTO =>
  pipe(
    findCurrent(patient.address),
    findFirst(() => true),
    map(toAddressDTO),
    getOrElse(() => emptyAddress)
  );

const toAddressDTO = (address: Address): AddressDTO => ({
  use: address.use,
  postalCode: address.postalCode,
  lines: address.line,
  city: address.city,
  state: address.state,
});
