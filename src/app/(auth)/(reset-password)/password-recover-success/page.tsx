import React from 'react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import CustomAlert from '@/components/atoms/AlertMessage';

const PasswordSuccessfullRecoverPage = () => {
  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base ">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="MyECP Password Reset"
      >
        <div className="flex flex-col p-4 !pb-0 gap-4">
          <CustomAlert
            type="success"
             className='py-4'
            description="Your password has been reset successfully for MyECP account."
          />

          <div className="flex items-center justify-end gap-2 mb-4 h-10">
            <Button variant="primary" className='h-full'>Login</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordSuccessfullRecoverPage;
