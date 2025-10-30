'use client';
import Card from '@/components/atoms/Card';
import React from 'react';
import Button from '@/components/atoms/Button';
import { Info } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import {
  LOGIN,
  LOGIN_ASSISTANCE,
  YOUR_USERID_IS,
} from '@/constants/forgotUserIdConstants';

export default function SuccessRecoverUserIDPage() {
  const router = useRouter();
  const userName = useSelector(
    (state: RootState) => state.forgotUserName.UserName,
  );
  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="Confirmation"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="card pt-6 pb-6">
            <div className="flex cursor-pointer items-center justify-start gap-1 pt-3 pr-4 pb-4 pl-4">
              <div className="flex items-center justify-center pl-2">
                <Image src={Info} alt="info-icon" />
              </div>
              <i>{LOGIN_ASSISTANCE}</i>
            </div>

            <hr className="border-[var(--text-disabled)]" />

            <div className="flex items-center justify-start gap-1 pt-4 pr-4 pb-2 pl-6">
              <p>{YOUR_USERID_IS}</p> <p className='font-bold tracking-tight'>{userName}.</p>
            </div>
          </div>

          <div className="flex items-center justify-end ">
            <div className="flex items-center justify-center gap-2">
              <Button variant={'primary'} onClick={() => router.push('/login')}>
                {LOGIN}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
