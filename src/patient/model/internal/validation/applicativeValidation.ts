import { getApplicativeValidation } from "fp-ts/Either";
import { getSemigroup } from "fp-ts/NonEmptyArray";

export const applicativeValidation = getApplicativeValidation(
  getSemigroup<string>()
);
