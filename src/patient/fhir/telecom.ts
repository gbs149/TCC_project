import { ContactPoint, Patient } from "fhir/r4";
import { pipe } from "fp-ts/lib/function";
import { getOrElse, map } from "fp-ts/lib/Option";
import { EMAIL_SYSTEM, PHONE_SYSTEM } from "../../constants/constants";
import { findCurrent } from "./current";
import { findBySystem } from "./withSystem";

const getTelecom =
  (system: string) =>
  (patient: Patient): { value: string; use: string } =>
    pipe(
      findCurrent(patient.telecom),
      findBySystem(system),
      map(toContactDTO),
      getOrElse(() => ({ value: "", use: "" }))
    );

const toContactDTO = ({
  use,
  value,
}: ContactPoint): { value: string; use: string } => ({
  value,
  use,
});

export const getEmail = getTelecom(EMAIL_SYSTEM);
export const getPhone = getTelecom(PHONE_SYSTEM);