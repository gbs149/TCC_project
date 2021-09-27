import { Period } from "fhir/r4";
import { filter } from "fp-ts/Array";

interface HasPeriod {
  period?: Period;
}

export const findCurrent = <T extends HasPeriod>(ts: T[] = []): T[] =>
  filter<T>((t: T) => t.period?.end === undefined)(ts);
