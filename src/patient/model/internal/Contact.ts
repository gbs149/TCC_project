import { ContactUseType } from "../../fhir/internal/valueSets";

export interface Contact {
  readonly use: ContactUseType;
  readonly value: string;
}
