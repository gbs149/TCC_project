import { ContactPoint } from "fhir/r4";
import { concat, fromOption } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { EMAIL_SYSTEM, PHONE_SYSTEM } from "../../../constants/constants";
import { Contact } from "../../model/Contact";
import { PatientModel } from "../../model/PatientModel";

export const toTelecom = (patient: PatientModel): ContactPoint[] =>
  concat([toEmailContactPoint(patient.email)])(
    pipe(patient.phone, Option.map(toPhoneContactPoint), fromOption)
  );

const toContactPoint =
  (system: "phone" | "email" | "other" | "fax" | "pager" | "url" | "sms") =>
  ({ use, value }: Contact): ContactPoint => ({
    system,
    use,
    value,
  });

const toPhoneContactPoint = toContactPoint(PHONE_SYSTEM);
const toEmailContactPoint = toContactPoint(EMAIL_SYSTEM);
