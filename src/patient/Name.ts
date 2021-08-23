import { string100, BoundedString } from "../validation/BoundedString";

export interface Name {
  readonly first: BoundedString;
  readonly last: BoundedString;
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
