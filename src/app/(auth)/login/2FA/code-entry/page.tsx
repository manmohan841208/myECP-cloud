'use client';

import Card from '@/components/atoms/Card';
import Image from '@/components/atoms/Image';
import React, { useState } from 'react';
import { Email } from '@/assets/svg';
import { InputField } from '@/components/atoms/InputField';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useRouter } from 'next/navigation';
import { useSendOtpMutation } from '@/store/services/sendOtpApi';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedOption, setOtpResponse } from '@/store/slices/sendOtpSlice';
import { useVerifyOtpMutation } from '@/store/services/verifyOtpApi';

const TwoFactAuthCodeEntryPage = () => {
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userData: any = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [sendOtpTrigger, { data, isLoading, error }] = useSendOtpMutation();
  const [verifyOtpTrigger, { data: verifyData, isLoading: isVerifying }] =
    useVerifyOtpMutation();
  const dispatch = useDispatch();
  const selectedOption = useSelector((state: any) => {
    return state?.sendOtpSlice?.selectedOption;
  });
  const encryptedOtp = useSelector((state: any) => {
    return state?.sendOtpSlice?.otpResponse;
  });

  const isEmpty = code.trim().length < 6;

  const router = useRouter();

  const handleContinue = async () => {
    if (isEmpty) {
      setShowError(true);
      setErrorMessage(`Please enter the 6-digit authentication code.`);
      return;
    }
    const payload: any = {
      UserId: userData?.UserId?.toString(),
      Otp: encryptedOtp,
      EnteredOtp: code,
    };

    try {
      const result: any = await verifyOtpTrigger(payload).unwrap();
      if (result?.Token) {
        localStorage.setItem('userInfo', JSON.stringify(result));
        localStorage.setItem('token', result?.Token);
        router.push('/account-summary');
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(
        err?.data?.message ||
          `We're sorry! The code you entered is either expired or invalid. Please try again.`,
      );
    }
  };

  const getOtp = async () => {
    try {
      const payload: any = {
        UserId: userData?.UserId?.toString(),
        OtpOption: selectedOption,
      };

      const response = await sendOtpTrigger(payload).unwrap();
      if (response?.Otp) {
        dispatch(setSelectedOption(selectedOption));
        dispatch(setOtpResponse(response?.Otp));
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(
        err?.data?.message ||
          `We're sorry! The code you entered is either expired or invalid. Please try again.`,
      );
    }
  };

  const handleCodeChange = (e: any) => {
    setErrorMessage('');
    setShowError(false);
    const inputCode = e.target.value;
    // Allow only numeric input and limit to 6 characters
    if (/^\d{0,6}$/.test(inputCode)) {
      setCode(inputCode);
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        header={'For Your Added Security'}
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
      >
        <div className="flex flex-col gap-4 px-4">
          {showError && (
            <CustomAlert
              type="error"
              className="mt-3"
              description={
                errorMessage
                  ? errorMessage
                  : `We're sorry! The code you entered is either expired or invalid. Please try again.`
              }
            />
          )}

          <div className="flex justify-end pt-3">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p className="text-sm sm:!text-base">
            <span className="font-bold">Check your Email.</span> An email with
            your authentication code has been sent. Please enter it below and
            click “Confirm”
          </p>

          <Card
            className="w-full bg-[var(--color-white)] !p-0"
            header={
              <>
                Select Delivery Method{' '}
                <span className="text-[var(--text-error)]">*</span>
              </>
            }
          >
            <div className="px-3">
              <div className="flex flex-col pt-9 pb-3">
                <div className="flex items-center gap-3 pl-4 text-[var(--color-disabled-text)]">
                  <div className="flex h-[60px] w-[60px] items-center justify-center">
                    <Image src={Email} alt="email-img" />
                  </div>

                  <div className="flex-1">
                    <InputField
                      label={
                        <div className="flex gap-1">
                          <p className="text-black">Enter Your Code</p>
                          <span className="text-[var(--text-error)]">*</span>
                        </div>
                      }
                      // className="w-full border-black text-base text-black sm:w-1/2"
                      value={code}
                      onChange={(e: any) => handleCodeChange(e)}
                      inputMode="numeric"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>

              <div className="ps-[calc(1rem+60px+0.75rem)] pb-5 text-sm">
                <Link
                  href="#"
                  className="text-[var(--hyperlink)]"
                  onClick={() => getOtp()}
                >
                  Click here to request a new authentication code
                </Link>
              </div>
            </div>
          </Card>

          <div className="mb-4 flex h-10 items-center justify-end gap-2">
            <Button
              variant={'outline'}
              className="h-full"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              variant={isEmpty ? 'disable' : 'primary'}
              className="h-full disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactAuthCodeEntryPage;
