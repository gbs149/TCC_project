import { findFirst } from "fp-ts/lib/Array";
import { Option } from "fp-ts/lib/Option";

interface WithSystem {
  system?: string;
}

export const findBySystem =
  (system: string) =>
  <T extends WithSystem>(ts: T[]): Option<T> =>
    findFirst<T>((t) => t.system === system)(ts);
