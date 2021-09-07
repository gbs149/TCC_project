import { HumanName, Patient } from "fhir/r4";
import { findFirst, head } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { getOrElse, map } from "fp-ts/lib/Option";
import { findCurrent } from "./current";

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
    getOrElse(() => ({ first: "", last: "" }))
  );
