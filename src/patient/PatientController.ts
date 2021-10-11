import { Patient, Resource } from "fhir/r4";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import { flow, pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";
import { fhirbase } from "../common/fhirbase";
import { PatientDTO } from "./DTOs/PatientDTO";
import { fromFhir } from "./fhir/fhirToPatient";
import { fromModel } from "./fhir/patientToFhir";
import { ValidationResult } from "./model/internal/validation/ValidationResult";
import { createPatient, PatientModel } from "./model/PatientModel";

const patientFhirbase = fhirbase("patient");

const dtoToFhir = flow(createPatient, E.map(fromModel));

export const register = (
  patientDTO: PatientDTO
): E.Either<NonEmptyArray<string>, Promise<E.Either<string, Resource>>> =>
  pipe(
    dtoToFhir(patientDTO),
    E.map(async (p) => await patientFhirbase.create(p))
  );

export const getAllPatients = async (): Promise<
  E.Either<string, ValidationResult<PatientModel>[]>
> => {
  const patients = await patientFhirbase.getAll();

  return E.map((ps: Patient[]) => A.map((p: Patient) => fromFhir(p))(ps))(
    patients as E.Either<string, Patient[]>
  );
};

export const getById = async (
  id: string
): Promise<E.Either<string, O.Option<ValidationResult<PatientModel>>>> => {
  const patient = await patientFhirbase.getById(id);
  return E.map(O.map(fromFhir))(patient as E.Either<string, O.Option<Patient>>);
};

export const remove = async (id: string): Promise<E.Either<string, Resource>> =>
  pipe(await patientFhirbase.delete(id));
