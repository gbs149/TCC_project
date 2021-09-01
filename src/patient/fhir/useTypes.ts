// TODO I need to find a better way...

export type AddressUseType = "home" | "work" | "temp" | "old" | "billing";
export const addressUses: AddressUseType[] = [
  "home",
  "work",
  "temp",
  "old",
  "billing",
];

export type GenderType = "male" | "female" | "other" | "unknown";
export const genderTypes: GenderType[] = ["male", "female", "other", "unknown"];

export type ContactUseType = "home" | "work" | "temp" | "old" | "mobile";
export const contactUses: ContactUseType[] = [
  "home",
  "work",
  "temp",
  "old",
  "mobile",
];
