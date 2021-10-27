import { Patient } from "fhir/r4";
import * as Array from "fp-ts/Array";
import * as Either from "fp-ts/Either";
import { flow, pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import * as Option from "fp-ts/Option";
import * as TaskEither from "fp-ts/TaskEither";
import { fhirbase } from "../common/fhirbase";
import { PatientDTO } from "./DTOs/PatientDTO";
import { fromFhirToPatientDTO } from "./fhir/fhirToPatient";
import { fromModelToFhir } from "./fhir/patientToFhir";
import { createPatientModel } from "./model/PatientModel";

const patientFhirbase = fhirbase("patient");

// PatientDTO
//   -> Either<NonEmptyArray<string>, PatientModel>
//   -> Either<NonEmptyArray<string>, FHIR.Patient>
//   -> TE.TaskEither<NonEmptyArray<string>, Resource>
//   -> TE.TaskEither<NonEmptyArray<string>, PatientDTO>
export const register = (
  patientDTO: PatientDTO
): TaskEither.TaskEither<NonEmptyArray<string>, PatientDTO> => {
  return pipe(
    createPatientModel(patientDTO),
    Either.map(fromModelToFhir),
    TaskEither.fromEither,
    TaskEither.chain(patientFhirbase.create),
    TaskEither.map(fromFhirToPatientDTO)
  );
};

export const getAllPatients = (): TaskEither.TaskEither<
  NonEmptyArray<string>,
  PatientDTO[]
> => {
  return pipe(
    patientFhirbase.getAll(),
    TaskEither.map((ps: Patient[]) => Array.map(fromFhirToPatientDTO)(ps))
  );
};

export const getById = (
  id: string
): TaskEither.TaskEither<NonEmptyArray<string>, Option.Option<PatientDTO>> =>
  pipe(
    patientFhirbase.getById(id),
    TaskEither.map(Option.map(fromFhirToPatientDTO))
  );

export const remove = (
  id: string
): TaskEither.TaskEither<NonEmptyArray<string>, PatientDTO> =>
  pipe(patientFhirbase.delete(id), TaskEither.map(fromFhirToPatientDTO));
