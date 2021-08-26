const contactUses = ["home", "work", "temp", "old", "mobile"];

export const isContactUse = (val: string): boolean => contactUses.includes(val);
