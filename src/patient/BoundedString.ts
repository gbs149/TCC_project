export type BoundedString = string;

// TODO curry this
export const boundString =
  (lower: number, upper: number) =>
  (str: string): BoundedString => {
    if (str.trim().length <= lower)
      throw Error(`String cannot shorter than ${lower} characters`);
    if (str.trim().length > upper) {
      throw Error(`String cannot be longer than ${upper} characters`);
    }

    return str;
  };

export const between0and100 = boundString(0, 100);
