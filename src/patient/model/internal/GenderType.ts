import { left, right } from "fp-ts/Either";
import { GenderType, genderTypes } from "../../fhir/internal/valueSets/gender";
import { ValidationResult } from "./validation/ValidationResult";

const isGender = (s: string): s is GenderType =>
  genderTypes.includes(s as GenderType);

export const makeGenderType = (s: string): ValidationResult<GenderType> =>
  isGender(s) ? right(s) : left(["Invalid gender type"]);
