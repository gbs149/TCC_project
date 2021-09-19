import { HumanName, Patient } from "fhir/r4";
import { head } from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { map } from "fp-ts/Option";
import { orElse } from "../../../helpers/fp-helpers";
import { findCurrent } from "./helpers/current";

export interface NameDTO {
  first: string;
  last: string;
}

const toNameDTO = (name: HumanName): NameDTO => ({
  first: name.given.join(" "),
  last: name.family,
});

export const getName = (patient: Patient): NameDTO =>
  pipe(
    findCurrent(patient.name),
    // I am assuming in this system that the patient will have only one active name
    // if we decide to allow different name uses we can change it here
    head,
    map(toNameDTO),
    orElse({ first: "", last: "" })
  );
