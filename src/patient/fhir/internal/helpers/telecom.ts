import { ContactPoint } from "fhir/r4";
import { concat, fromOption } from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import * as Option from "fp-ts/Option";
import { EMAIL_SYSTEM, PHONE_SYSTEM } from "../../../../constants/constants";
import { Contact } from "../../../model/internal/Contact";
import { PatientModel } from "../../../model/PatientModel";

export const toTelecom = ({ email, phone }: PatientModel): ContactPoint[] =>
  concat([toEmailContactPoint(email)])(
    pipe(phone, Option.map(toPhoneContactPoint), fromOption)
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
