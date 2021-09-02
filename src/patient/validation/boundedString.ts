const isLongerThan = (n: number) => (s: string) => s.trim().length > n;
const isShorterThan = (n: number) => (s: string) => s.trim().length < n;

const isShorterThan100 = isShorterThan(100);
const isNotEmpty = isLongerThan(0);

export const isValidString = (s: string): boolean =>
  isShorterThan100(s) && isNotEmpty(s);
