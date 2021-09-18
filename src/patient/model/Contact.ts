import { ContactUseType } from "../fhir/valueSets";

export interface Contact {
  readonly use: ContactUseType;
  readonly value: string;
}
