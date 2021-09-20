import { Identifier, Patient } from "fhir/r4";
import { pipe } from "fp-ts/function";
import { map, Option } from "fp-ts/Option";
import { CPF_NAMING_SYSTEM } from "../../../constants/constants";
import { findBySystem } from "./helpers/withSystem";

export const getCpf = ({ identifier }: Patient): Option<string> =>
  pipe(
    findBySystem(CPF_NAMING_SYSTEM)(identifier),
    map((i: Identifier) => i.value)
  );
