import { string100, BoundedString } from "../validation/boundedString";
import { Either } from "fp-ts/lib/Either";

export interface Name {
  readonly first: Either<string, BoundedString>;
  readonly last: Either<string, BoundedString>;
}

export const createName = ({
  first,
  last,
}: {
  first: string;
  last: string;
}): Name => ({
  first: string100(first),
  last: string100(last),
});
