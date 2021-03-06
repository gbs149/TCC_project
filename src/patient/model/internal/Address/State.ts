import { left, right } from "fp-ts/Either";
import { ValidationResult } from "../validation/ValidationResult";

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

export const makeState = (s: string): ValidationResult<State> =>
  isState(s) ? right(s) : left(["Invalid state"]);
