'use client';
import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import { Relode } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomAlert from '@/components/atoms/AlertMessage';
import { NotSecure } from '@/assets/svg';
import { useRouter } from 'next/navigation';
// import DatePicker from '@/components/atoms/Calendar/page';
import { Advertisement1, Advertisement2 } from '@/assets/svg';
import CustomCheckbox from '@/components/atoms/Checkbox';
import TimeOutPage from '@/components/molecules/TimeOut';
import ButtonExample from '@/components/atoms/Button/example';

export default function CreateProfile() {
  const captcha = 'HE7L00';

  const [showTimeout, setShowTimeout] = useState(false);
  const [cancelRegistration, setCancelRegistration] = useState(false);

  const route = useRouter();

  return (
    <div className="flex w-full gap-4 p-4 !text-base md:px-16">
      {/* This is Seassion Time-out part */}
      {showTimeout && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black opacity-25" />

          {/* Modal content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <TimeOutPage
              // className=""
              message={
                <div className="flex p-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-base">
                      Your session is inactive and the data will be lost in{' '}
                      <span className="text-lg text-[var(--color-red)]">
                        0:54
                      </span>{' '}
                      if you do not continue with the action.
                    </p>

                    <p>
                      Please click “Next” button on the main page to continue.
                    </p>

                    <div className="flex w-full justify-end">
                      <Button variant={'primary'}>Continue</Button>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}

      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="Create your Profile"
      >
        <div className="w-full pt-6 pr-6 pl-6">
          <div className="flex h-10 w-full items-center justify-evenly">
            <div className="flex h-[1px] w-4/5 items-center justify-between bg-[var(--color-blue)]">
              <Button
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full"
                variant="primary"
              >
                1
              </Button>

              <Button
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white"
                variant="outline"
              >
                2
              </Button>

              <Button
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white"
                variant="outline"
              >
                3
              </Button>

              <Button
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white"
                variant="outline"
              >
                4
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-4">
          {/* <CustomAlert type="error" description="custom error" /> */}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)] !text-sm">*</span>Required
              Fields
            </b>
          </div>

          <Card className="customCard flex w-full flex-col gap-3 lg:px-6 py-3 sm:flex-row md:p-6">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="sm:w-1/2">
                  <InputField
                    label="Card Number"
                    mandantory={true}
                    name="lastName"
                    placeholder="Enter your 16-digit card number"
                  />
                </div>

                <div className="flex w-full gap-1 sm:w-1/2">
                  <InputField
                    label="Expiration Date"
                    mandantory={true}
                    placeholder="Month"
                    help="Card expiration date"
                  />
                  <InputField
                    label=""
                    //  mandantory={true}
                    placeholder="Year"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="sm:w-1/2">
                  <InputField
                    label="Social Security Number"
                    mandantory={true}
                    name="SocialSecurityNumber"
                    placeholder="***_**_****"
                    help="The social security number you
                        enter must match our records."
                    helpWidth="w-[200px]"
                  />
                </div>

                <div className="sm:w-1/2">
                  <InputField
                    label="Date of Birth"
                    mandantory={true}
                    name="DateOfBirth"
                    placeholder="MM/DD/YYYY"
                    help="The date of birth you enter
must match our records."
                    helpWidth="w-[165px]"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="customCard flex w-full gap-3 lg:px-6 md:p-6">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="sm:w-1/2">
                  <InputField
                    label="Enter a Valid Email ID"
                    mandantory={true}
                    name="lastName"
                    placeholder="Enter a Valid Email"
                  />
                </div>

                <div className="sm:w-1/2">
                  <InputField
                    label="Re-Enter Email ID"
                    mandantory={true}
                    name="lastName"
                    placeholder="Re-Enter Email"
                  />
                </div>
              </div>

              <div className="">
                <CustomCheckbox label=" I agree the Exchange Credit Program may use the mailing and/or E-mail address I have provided to send me information about MILITARY STAR promotions, services, and financial information" />
              </div>
            </div>
          </Card>

          <Card className="customCard flex flex-col lg:px-6 py-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div className="bg-[#000f73] px-[12px] py-1 text-xl text-white">
                  {captcha}
                </div>

                <Button className="!bg-transparent !p-1">
                  <Image src={Relode} alt="relode-img" />
                </Button>
              </div>

              <div className="w-1/2">
                <InputField
                  placeholder="Enter Captcha Code"
                  name="captchaInput"
                />
              </div>
            </div>

            <p className={`} mt-1 w-full text-sm sm:w-1/2`}>
              Please enter the text as shown above before clicking on “Next”
            </p>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">Cancel</Button>

            <Button variant="disable">Next</Button>
          </div>
        </div>
      </Card>

      {/* This is Advertisement part */}
      <div className="hidden w-[23%] flex-col gap-4 md:flex">
        <Card className="relative overflow-hidden shadow-lg">
          <Image src={Advertisement1} className="" alt="advertisement" />
        </Card>

        <Card className="relative overflow-hidden shadow-lg">
          <Image className="" src={Advertisement2} alt="advertisement" />
        </Card>
      </div>

      {/* This is Cancel Registration part */}
      {cancelRegistration && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black opacity-25" />

          {/* Modal content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <TimeOutPage
              // className=""
              message={
                <div className="flex p-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-base">
                      This action will result in losing the data entered on this
                      page and will not complete the registration process. Do
                      you wish to continue?
                    </p>

                    <div className="flex w-full justify-end gap-2">
                      <Button variant={'outline'}>Cancel</Button>

                      <Button variant={'primary'}>Continue</Button>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
