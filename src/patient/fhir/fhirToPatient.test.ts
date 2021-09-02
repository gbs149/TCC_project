import { Either } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { PatientModel } from "../model/PatientModel";
import { expectedPatientModel } from "./__snapshots__/patientModel";
import { fromFhir } from "./fhirToPatient";
import { patient } from "./__fixtures__/patientFixture";

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
});