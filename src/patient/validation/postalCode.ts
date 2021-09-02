// 8 consecutive digits
const postalCodeRegex = /^\d{8}$/;

export const isValidPostalCode = (postalCode: string): boolean =>
  postalCodeRegex.test(postalCode);
