import { ContactPoint, Patient } from "fhir/r4";
import { pipe } from "fp-ts/function";
import { map, Option } from "fp-ts/Option";
import { EMAIL_SYSTEM, PHONE_SYSTEM } from "../../../constants/constants";
import { findCurrent } from "./helpers/current";
import { findBySystem } from "./helpers/withSystem";

const getTelecom =
  (system: string) =>
  (patient: Patient): Option<{ value: string; use: string }> =>
    pipe(findCurrent(patient.telecom), findBySystem(system), map(toContactDTO));

const toContactDTO = ({
  use,
  value,
}: ContactPoint): { value: string; use: string } => ({
  value,
  use,
});

export const getEmail = getTelecom(EMAIL_SYSTEM);
export const getPhone = getTelecom(PHONE_SYSTEM);
