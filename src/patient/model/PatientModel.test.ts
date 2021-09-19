import { invalidPatientDTO } from "../__fixtures__/invalidPatientDTO";
import {
  completePatientDTO,
  noPhonePatientDTO,
} from "../__fixtures__/patientDTO";
import { errors } from "../__snapshots__/errors";
import {
  completePatientModel,
  noPhonePatientModel,
} from "../__snapshots__/patientModel";
import { createPatient } from "./PatientModel";

describe("Patient", () => {
  it("should create a patient from valid data", () => {
    expect(createPatient(completePatientDTO)).toStrictEqual(
      completePatientModel
    );
  });

  it("should create a patient without a phone", () => {
    expect(createPatient(noPhonePatientDTO)).toStrictEqual(noPhonePatientModel);
  });

  it("should add a bunch of errrors  a patient", () => {
    expect(createPatient(invalidPatientDTO)).toStrictEqual(errors);
  });
});
