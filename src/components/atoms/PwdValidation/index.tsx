import React from 'react';
type PasswordRequirementsProps = {
  password: string;
};
export default function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const validations = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[&@#%$^*!]/.test(password),
  };
  const getClass = (condition: boolean) =>
    condition ? 'text-[#318B29] font-medium' : 'text-black-600';
  const getIcon = (condition: boolean) => (condition ? '✓' : '•');
  return (
    <div className="flex h-[136px] w-full flex-col gap-2 border-none p-2 text-[12px]">
      <p className="h-4 font-bold">The password must have:</p>
      <ul className="flex max-h-[96px] max-w-[168px] flex-col text-[11px]">
        <li className={`${getClass(validations.length)} pl-1`}>
          {getIcon(validations.length)}{' '}
          <span className="pl-1">At least 8 characters</span>
        </li>
        <li className={`${getClass(validations.number)} pl-1`}>
          {getIcon(validations.number)}{' '}
          <span className="pl-1">At least one number</span>
        </li>
        <li className={`${getClass(validations.uppercase)} pl-1`}>
          {getIcon(validations.uppercase)}{' '}
          <span className="pl-1">At least one uppercase letter</span>
        </li>
        <li className={`${getClass(validations.lowercase)} pl-1`}>
          {getIcon(validations.lowercase)}{' '}
          <span className="pl-1">At least one lowercase letter</span>
        </li>
        <li className={`${getClass(validations.special)} pl-1`}>
          {getIcon(validations.special)}{' '}
          <span className="pl-1">
            At least one special character (&, @, #, %, $, ^, !, *)
          </span>
        </li>
      </ul>
    </div>
  );
}
