// Could not find a way to avoid this duplication :|

export type ContactUseType = "home" | "work" | "temp" | "old" | "mobile";
export const contactUses: ContactUseType[] = [
  "home",
  "work",
  "temp",
  "old",
  "mobile",
];

export type ContactPointSystem =
  | "phone"
  | "email"
  | "other"
  | "fax"
  | "pager"
  | "url"
  | "sms";
