import { Period } from "fhir/r4";
import { filter } from "fp-ts/lib/Array";

interface hasPeriod {
  period?: Period;
}

export const findCurrent = <T extends hasPeriod>(ts: T[]): T[] =>
  filter<T>((t: T) => t.period?.end === undefined)(ts);
