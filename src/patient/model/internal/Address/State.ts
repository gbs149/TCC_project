import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

interface StateBrand {
  readonly State: unique symbol;
}

export type State = string & StateBrand;

const isState = (s: string): s is State => states.includes(s);

export const makeState = (s: string): Either<NonEmptyArray<string>, State> =>
  isState(s) ? right(s) : left(["Invalid state"]);
