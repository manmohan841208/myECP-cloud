'use client';

import CustomAlert from '@/components/atoms/AlertMessage';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForYourSecurityPage = () => {
  const [city, setCity] = useState('');
  const [friendName, setFriendName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const correctCity = 'Texas';
  const correctFriendName = 'John';

  const handleSubmit = () => {
    if (city === correctCity && friendName === correctFriendName) {
      router.push('/login');
      console.log('true');
    } else {
      setShowAlert(true);
    }
  };

  const isEmpty = !city || !friendName;

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base ">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="For Your Security"
      >
        <div className="flex flex-col p-6 !pb-0 gap-4">
          {showAlert && (
            <CustomAlert
              type="error"
              description="The information you entered does not match our records. You have 2 attempts remaining. Security questions are selected at random. The below questions may have changed "
            />
          )}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)] !text-sm">*</span>Required
              Fields
            </b>
          </div>

          <p className='text-sm sm:!text-base'>
            To verify and protect your account, please answer your security
            questions.
          </p>

          <Card className="flex w-full bg-[var(--color-white)] p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">
                      In what city was your highschool? (enter full name of city
                      only.)
                    </p>
                    <span className="text-[var(--text-error)]">*</span>
                  </div>
                }
                // error={isEmpty ? '' : undefined}
                // className="w-full border-black text-base text-black sm:w-1/2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </Card>

          <Card className="flex w-full bg-[var(--color-white)] p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">
                      What is your best friend’s first name?
                    </p>
                    <span className="">*</span>
                  </div>
                }
                // error={isEmpty ? '' : undefined}
                // className="w-full border-black text-base text-black sm:w-1/2"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 mb-4 h-10">
            <Button variant="outline" className='h-full'>Cancel</Button>

            <Button
              variant={isEmpty ? 'disable' : 'primary'}
              className="disabled:cursor-not-allowed disabled:opacity-50 h-full"
              //   disable={isEmpty}
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForYourSecurityPage;
