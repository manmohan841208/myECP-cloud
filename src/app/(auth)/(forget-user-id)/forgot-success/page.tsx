import Card from '@/components/atoms/Card';
import React from 'react';
import Button from '@/components/atoms/Button';
import { Tooltip } from '@/assets/svg';
import Image from '@/components/atoms/Image';

export default function SuccessRecoverUserIDPage() {
  return (
      <div className="mx-auto max-w-[1152px] p-4 !text-base ">
        <Card
          className="w-full bg-[var(--color-white)] !p-0 md:max-w-[802px]"
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

              <hr className="border-[#c7c7c7] opacity-50 h-0" />

              <div className="flex items-center justify-start gap-1 pt-3 pr-4 pb-2 pl-6">
                <p>Your User ID is</p> <b>MMACCXPrime.</b>
              </div>
            </div>

            <div className="flex items-center justify-end h-10 ">
              {/* <div className="flex items-center justify-center"> */}
                <Button
                  variant={'primary'}
                  className='h-full'
                  //   onClick={()=>route.push('/login/2FA/code-entry')}
                >
                  Login
                </Button>
              {/* </div> */}
            </div>
          </div>
        </Card>
      </div>
  );
}
