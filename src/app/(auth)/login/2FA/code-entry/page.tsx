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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from '@/schemas/verifyOtpSchema';
import { CANCEL, CONTINUE, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { Loader } from '@/components/atoms/Loader';
import { SELECT_DELIVERY_METHOD } from '@/constants/commonConstants';
import {
  CHECK_YOUR_EMAIL,
  CLICK_HERE_TO_REQUEST_A_NEW_AUTHENTICATION_CODE,
  ENTER_YOUR_CODE,
  YOUR_AUTHENTICATION_CODE_HAS_BEEN_SENT,
} from '@/constants/verifyOtpConstants';
import {
  login as loggedIn,
  setAuthFromStorage,
} from '@/store/slices/authSlice';
import { setSession } from '@/lib/session';

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: VerifyOtpFormValues) => {
    if (!isValid) {
      setShowError(true);
      setErrorMessage(`Please enter the 6-digit authentication code.`);
      return;
    }

    const payload = {
      UserId: userData?.UserId?.toString(),
      Otp: encryptedOtp,
      EnteredOtp: data.code,
    };

    try {
      const result: any = await verifyOtpTrigger(payload).unwrap();
      if (result?.Token) {
        localStorage.setItem('userInfo', JSON.stringify(result));
        localStorage.setItem('token', result?.Token);
        dispatch(setAuthFromStorage(result?.Token));
        dispatch(loggedIn());
        setSession(result?.Token);
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
        err?.data?.message || `Something went wrong! Please try again.`,
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
        {(isVerifying || isLoading) && <Loader className="mx-auto mb-4" />}
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
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <p className="text-sm sm:!text-base">
            <span className="font-bold">{CHECK_YOUR_EMAIL}</span>{' '}
            {YOUR_AUTHENTICATION_CODE_HAS_BEEN_SENT}
          </p>

          <Card
            className="w-full bg-[var(--color-white)] !p-0"
            header={
              <>
                {SELECT_DELIVERY_METHOD}{' '}
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
                          <p className="text-black">{ENTER_YOUR_CODE}</p>
                          <span className="text-[var(--text-error)]">*</span>
                        </div>
                      }
                      // className="w-full border-black text-base text-black sm:w-1/2"
                      inputMode="numeric"
                      maxLength={6}
                      {...register('code', {
                        onChange: handleCodeChange,
                      })}
                      error={errors.code?.message}
                      // value={form}
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
                  {CLICK_HERE_TO_REQUEST_A_NEW_AUTHENTICATION_CODE}
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
              {CANCEL}
            </Button>

            <Button
              variant={!isValid || isVerifying ? 'disable' : 'primary'}
              className="h-full disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isVerifying}
            >
              {CONTINUE}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactAuthCodeEntryPage;
