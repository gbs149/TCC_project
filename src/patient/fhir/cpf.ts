import { Identifier, Patient } from "fhir/r4";
import { pipe } from "fp-ts/lib/function";
import { getOrElse, map } from "fp-ts/lib/Option";
import { CPF_NAMING_SYSTEM } from "../../constants/constants";
import { findBySystem } from "./withSystem";

export const getCpf = (patient: Patient): string =>
  pipe(
    findBySystem(CPF_NAMING_SYSTEM)(patient.identifier),
    map((i: Identifier) => i.value),
    getOrElse(() => "")
  );
