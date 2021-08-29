import { PatientModel } from "../model/PatientModel";
import { Patient } from "fhir/r4";
import { Either } from "fp-ts/lib/Either";

type fromModel = (p: PatientModel) => Patient;

const fromModel = (p: PatientModel): Either<string[], Patient> => ({
  id: p.id,
  gender: p.gender,
  resourceType: "Patient",
});
