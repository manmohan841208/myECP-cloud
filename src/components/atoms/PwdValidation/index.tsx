import React from 'react';
import { CorrectIcon } from '@/assets/svg';
import Image from '../Image';

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
  const getIcon = (condition: boolean) =>
    condition ? <Image alt="correct" src={CorrectIcon} /> : '•';
  return (
    <div className="flex h-[136px] w-full flex-col gap-2 border-none p-2 text-[12px]">
      <p className="h-4 font-bold">The password must have:</p>
      <ul className="flex max-h-[96px] flex-col text-[11px]">
        <li className={`${getClass(validations.length)} pl-1`}>
          <span className="flex items-center">
            <div className="flex min-w-[15px] items-center justify-center">
              {getIcon(validations.length)}{' '}
            </div>
            <span className="pl-1">At least 8 characters</span>
          </span>
        </li>
        <li
          className={`${getClass(validations.number)} flex items-center pl-1`}
        >
          <div className="flex min-w-[15px] items-center justify-center">
            {getIcon(validations.number)}{' '}
          </div>
          <span className="pl-1">At least one number</span>
        </li>
        <li
          className={`${getClass(validations.uppercase)} flex items-center pl-1`}
        >
          <div className="flex min-w-[15px] items-center justify-center">
            {getIcon(validations.uppercase)}{' '}
          </div>
          <span className="pl-1">At least one uppercase letter</span>
        </li>
        <li
          className={`${getClass(validations.lowercase)} flex items-center pl-1`}
        >
          <div className="flex min-w-[15px] justify-center">
            {getIcon(validations.lowercase)}{' '}
          </div>
          <span className="pl-1">At least one lowercase letter</span>
        </li>
        <li
          className={`${getClass(validations.special)} flex items-center pl-1`}
        >
          <div className="flex min-w-[15px] items-center justify-center">
            {getIcon(validations.special)}{' '}
          </div>
          <span className="pl-1">
            At least one special character (&, @, #, %, $, ^, !, *)
          </span>
        </li>
      </ul>
    </div>
  );
}
