import { Patient } from "fhir/r4";
import { map } from "fp-ts/Array";
import { fhirbase } from "../common/fhirbase";
import { fromFhir } from "./fhir/fhirToPatient";
import { fromModel } from "./fhir/patientToFhir";
import { PatientModel } from "./model/PatientModel";

const patientFhirebase = fhirbase("Patient");

export const getAllPatients = async () => {
  const patients = await patientFhirebase.getAll();
  return map(fromFhir)(patients as Patient[]);
};

export const register = async (patient: PatientModel) => {
  const fhirPatient = fromModel(patient);
  const created = await patientFhirebase.create(fhirPatient);
  return fromFhir(created as Patient);
};
