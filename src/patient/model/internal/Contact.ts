import { ContactUseType } from "../../fhir/internal/valueSets/contact";

export interface Contact {
  readonly use: ContactUseType;
  readonly value: string;
}
