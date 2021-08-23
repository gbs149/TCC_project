export type BoundedString = string;

// TODO curry this
export const boundString =
  (lower: number, upper: number) =>
  (str: string): BoundedString => {
    if (str.trim().length < lower)
      throw Error(
        `String cannot shorter than ${lower} character${lower > 1 ? "s" : ""}`
      );
    if (str.trim().length > upper) {
      throw Error(`String cannot be longer than ${upper} characters`);
    }

    return str;
  };

export const string100 = boundString(1, 100);
