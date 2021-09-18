import { Identifier, Patient } from "fhir/r4";
import { pipe } from "fp-ts/lib/function";
import { map, Option } from "fp-ts/lib/Option";
import { CPF_NAMING_SYSTEM } from "../../../constants/constants";
import { findBySystem } from "./helpers/withSystem";

export const getCpf = (patient: Patient): Option<string> =>
  pipe(
    findBySystem(CPF_NAMING_SYSTEM)(patient.identifier ?? []),
    map((i: Identifier) => i.value)
  );
