import { findFirst } from "fp-ts/Array";
import { Option } from "fp-ts/Option";

interface WithSystem {
  system?: string;
}

export const findBySystem =
  (desiredSystem: string) =>
  <T extends WithSystem>(ts: T[] = []): Option<T> =>
    findFirst<T>((t) => t.system === desiredSystem)(ts);
