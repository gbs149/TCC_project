import { getOrElse, Option } from "fp-ts/lib/Option";

export const orElse =
  <T>(defaultValue: T) =>
  (o: Option<T>): T =>
    getOrElse(() => defaultValue)(o);
