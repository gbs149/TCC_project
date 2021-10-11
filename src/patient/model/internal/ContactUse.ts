import { left, right } from "fp-ts/Either";
import {
  contactUses,
  ContactUseType,
} from "../../fhir/internal/valueSets/contact";
import { ValidationResult } from "./validation/ValidationResult";

const isContactUse = (s: string): s is ContactUseType =>
  contactUses.includes(s as ContactUseType);

export const makeContactUse = (s: string): ValidationResult<ContactUseType> =>
  isContactUse(s) ? right(s) : left(["Invalid contact use"]);
