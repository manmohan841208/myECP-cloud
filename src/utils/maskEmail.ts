function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');

  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedMiddle = '*'.repeat(localPart.length - 2);

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
}

export default maskEmail;
