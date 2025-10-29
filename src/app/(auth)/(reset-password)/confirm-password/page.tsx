'use client';

// import CustomAlert from '@/components/atoms/AlertMessage'
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
// import React, { useState } from 'react'
import React from 'react';
// import { useRouter } from 'next/navigation'

const ResetPasswordPage = () => {
  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base ">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="Reset Password"
      >
        <div className="flex flex-col p-6 !pb-0 gap-4">
          {/* <CustomAlert type="error" description="Password not match" /> */}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)] !text-sm">*</span>Required
              Fields
            </b>
          </div>

          <Card className="customCard flex w-full flex-col gap-3 lg:px-6 py-3 sm:flex-row md:p-6">
            <div className="w-full sm:w-1/2">
              <InputField
                label="New Password"
                mandantory={true}
                type="password"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <InputField
                label="Confirm Password"
                mandantory={true}
                type="password"
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 mb-4 h-10">
            <Button variant="outline" className='h-full'>Cancel</Button>

            <Button
              variant="disable"
              className="disabled:cursor-not-allowed disabled:opacity-50 h-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
