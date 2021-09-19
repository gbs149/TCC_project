import {
  Metadata,
  parsePhoneNumberFromString,
  PhoneNumber,
} from "libphonenumber-js/core";
import metadata from "./phone.metadata.json";

const parsePhoneNumber = (num: string): PhoneNumber =>
  parsePhoneNumberFromString(num, "BR", metadata as unknown as Metadata);

const isValidPhoneNumber = (num: string): boolean =>
  parsePhoneNumber(num)?.isValid() ?? false;

const formatPhoneNumber = (num: string): string => {
  const phone = parsePhoneNumber(num);
  return phone.format("E.164");
};

export { formatPhoneNumber, isValidPhoneNumber };
