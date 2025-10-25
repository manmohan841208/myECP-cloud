'use client';
import Card from '@/components/atoms/Card';
import React from 'react';
import Button from '@/components/atoms/Button';
import { Tooltip } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function SuccessRecoverUserIDPage() {
  const userName = useSelector(
    (state: RootState) => state.forgotUserName.UserName,
  );
  return (
    <div className="w-full px-4 py-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="Confirmation"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="card pt-4 pb-4">
            <div className="flex cursor-pointer items-center justify-start gap-1 pt-3 pr-4 pb-3 pl-4">
              <div className="flex items-center justify-center pl-2">
                <Image src={Tooltip} alt="tooltip-img" />
              </div>
              <i>Log in Assistance</i>
            </div>

            <hr className="border-[var(--text-disabled)]" />

            <div className="flex items-center justify-start gap-1 pt-3 pr-4 pb-2 pl-6">
              <p>Your User ID is</p> <b>{userName}</b>
            </div>
          </div>

          <div className="flex items-center justify-end pb-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={'primary'}
                //   onClick={()=>route.push('/login/2FA/code-entry')}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
