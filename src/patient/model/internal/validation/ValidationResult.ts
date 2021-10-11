import { Either } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";

export type ValidationResult<T> = Either<NonEmptyArray<string>, T>;
