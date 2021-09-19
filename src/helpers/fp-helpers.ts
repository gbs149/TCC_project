import { getOrElse, Option } from "fp-ts/lib/Option";

export const orElse =
  <T>(empty: T) =>
  (o: Option<T>): T =>
    getOrElse(() => empty)(o);
