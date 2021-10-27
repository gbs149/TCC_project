import { invalidPatientDTO } from "../__fixtures__/invalidPatientDTO";
import {
  completePatientDTO,
  noPhonePatientDTO,
} from "../__fixtures__/patientDTO";
import { errors } from "../__snapshots__/errors";
import { noPhonePatientFhir, patientFhir } from "../__snapshots__/patientFhir";
import { createPatientModel } from "../model/PatientModel";
import { fromValidatedModel } from "./patientToFhir";

describe("patientFhir", () => {
  it("should create a valid fhir resource from PatientModel", () => {
    const patient = createPatientModel(completePatientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toStrictEqual({
      _tag: "Right",
      right: patientFhir,
    });
  });

  it("should create a valid fhir resource from PatientModel with no phone", () => {
    const patient = createPatientModel(noPhonePatientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toStrictEqual({
      _tag: "Right",
      right: noPhonePatientFhir,
    });
  });

  it("should not create a fhir resource when there are errors in model", () => {
    // we should trust the model to create a valid patient, so no validation should be needed when going to FHIR
    const patient = createPatientModel(invalidPatientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toEqual(errors);
  });
});
