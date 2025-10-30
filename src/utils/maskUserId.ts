function maskUserId(str: string): string {
  if (str.length <= 2) return str; // nothing to mask

  const firstChar = str[0];
  const lastChar = str[str.length - 1];
  const maskedMiddle = '*'.repeat(str.length - 2);

  return `${firstChar}${maskedMiddle}${lastChar}`;
}

export default maskUserId;
