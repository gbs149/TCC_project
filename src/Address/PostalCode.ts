export interface PostalCode {
  readonly value: string;
}

export const createPostalCode = (postalCode: string): PostalCode => {
  if (isValid(postalCode)) {
    return { value: postalCode };
  } else {
    throw Error("Invalid postal code");
  }
};

// 8 consecutive digits
const postalCodeRegex = /^\d{8}$/;

const isValid = (postalCode: string): boolean =>
  postalCodeRegex.test(postalCode);
