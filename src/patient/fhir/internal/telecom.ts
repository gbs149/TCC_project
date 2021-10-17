import { ContactPoint, Patient } from "fhir/r4";
import { pipe } from "fp-ts/function";
import { map, Option } from "fp-ts/Option";
import { EMAIL_SYSTEM, PHONE_SYSTEM } from "../../../constants/constants";
import { ContactDTO } from "../../DTOs/ContactDTO";
import { findCurrent } from "./helpers/current";
import { findBySystem } from "./helpers/withSystem";

const getTelecom =
  (system: string) =>
  (patient: Patient): Option<ContactDTO> =>
    pipe(findCurrent(patient.telecom), findBySystem(system), map(toContactDTO));

const toContactDTO = ({ use, value }: ContactPoint): ContactDTO => ({
  value,
  use,
});

export const getEmail = getTelecom(EMAIL_SYSTEM);
export const getPhone = getTelecom(PHONE_SYSTEM);
