import { getApplicativeValidation } from "fp-ts/lib/Either";
import { getSemigroup } from "fp-ts/lib/NonEmptyArray";

export const applicativeValidation = getApplicativeValidation(
  getSemigroup<string>()
);
