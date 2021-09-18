import { Patient } from "fhir/r4";
import { Either } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

import { PatientModel } from "../model/PatientModel";
import { fromFhir } from "./fhirToPatient";

import { patient } from "./__fixtures__/patientFhir";
import { expectedPatientModel } from "./__snapshots__/patientModel";

describe("FHIR to Patient model", () => {
  it("should map from fhir to model", () => {
    const patientModel: Either<NonEmptyArray<string>, PatientModel> = fromFhir(
      patient
    );
    expect(patientModel).toStrictEqual({
      _tag: "Right",
      right: expectedPatientModel,
    });
  });
  it("should map from fhir to list of errors", () => {
    const p: Patient = { resourceType: "Patient" };
    const patientModel: Either<NonEmptyArray<string>, PatientModel> = fromFhir(
      p
    );
    expect(patientModel).toStrictEqual({
      _tag: "Left",
      left: [
        "City name cannot be empty",
        "Invalid postal code",
        "Invalid state",
        "Invalid address use",
        "Invalid date",
        "Invalid CPF",
        "Invalid email",
        "Invalid contact use",
        "Invalid gender type",
        "Invalid first name",
        "Invalid last name",
        "Invalid phone number",
        "Invalid contact use",
      ],
    });
  });
});
