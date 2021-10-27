import { invalidPatientDTO } from "../__fixtures__/invalidPatientDTO";
import {
  completePatientDTO,
  noPhonePatientDTO,
} from "../__fixtures__/patientDTO";
import { errors, errorsForIncompleteDTO } from "../__snapshots__/errors";
import {
  completePatientModel,
  noPhonePatientModel,
} from "../__snapshots__/patientModel";
import { PatientDTO } from "../DTOs/PatientDTO";
import { createPatientModel } from "./PatientModel";

describe("Patient", () => {
  it("should create a patient from valid data", () => {
    expect(createPatientModel(completePatientDTO)).toStrictEqual(
      completePatientModel
    );
  });

  it("should create a patient without a phone", () => {
    expect(createPatientModel(noPhonePatientDTO)).toStrictEqual(
      noPhonePatientModel
    );
  });

  it("should add a bunch of errors a patient", () => {
    expect(createPatientModel(invalidPatientDTO)).toStrictEqual(errors);
  });

  it("should add a bunch of errors an incomplete patient", () => {
    expect(createPatientModel({} as PatientDTO)).toStrictEqual(
      errorsForIncompleteDTO
    );
  });
});
