import { fromValidatedModel } from "./patientToFhir";
import { createPatient } from "../model/PatientModel";

import { noPhonePatientDTO, patientDTO } from "./__fixtures__/patientDTO";
import { patientFhir, noPhonePatientFhir } from "./__snapshots__/patientFhir";
import { invalidPatientDTO } from "./__fixtures__/invalidPatientDTO";

describe("patientFhir", () => {
  it("should create a valid fhir resource from PatientModel", () => {
    const patient = createPatient(patientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toStrictEqual({
      _tag: "Right",
      right: patientFhir,
    });
  });

  it("should create a valid fhir resource from PatientModel with no phone", () => {
    const patient = createPatient(noPhonePatientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toStrictEqual({
      _tag: "Right",
      right: noPhonePatientFhir,
    });
  });

  it("should not create a fhir resource when there are errors in model", () => {
    // we should trust the model to create a valid patient, so no validation should be needed when going to FHIR
    const patient = createPatient(invalidPatientDTO);
    const fhirP = fromValidatedModel(patient);
    expect(fhirP).toEqual({
      _tag: "Left",
      left: [
        "Birthdate must be in the past",
        "Invalid CPF",
        "Invalid first name",
        "Invalid phone number",
        "Invalid contact use",
      ],
    });
  });
});
