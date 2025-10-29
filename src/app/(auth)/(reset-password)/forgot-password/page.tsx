'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import { Relode } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomAlert from '@/components/atoms/AlertMessage';
import { NotSecure } from '@/assets/svg';
import { useRouter } from 'next/navigation';
import { setForgotPWDSecurityQuestions } from '@/store/slices/forgotSecurityQuestionsSlice';
import { useDispatch } from 'react-redux';
import { useForgotPasswordMutation } from '@/store/services/forgotPasswordApi';
import { useLazyGetCaptchaImageQuery } from '@/store/services/getCaptchaApi';
import { extractTextFromCaptchaBlob } from '@/utils/blobToText';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/schemas/forgotPasswordSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { Loader } from '@/components/atoms/Loader';
import { FORGOT_PASSWORD } from '@/constants/forgotPasswordConstants';
import { PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE } from '@/constants/forgotUserIdConstants';
import { set } from 'zod';
import DatePicker from '@/components/atoms/Calendar/page';
import { format } from 'date-fns';

export default function ForgotUserIdPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const route = useRouter();

  const [captchaVerify, setCaptchaVerify] = useState('');
  const [form, setForm] = useState({
    UserName: '',
    SSNLast5: '',
    DOB_Day: '',
    DOB_Month: '',
    DOB_Year: '',
  });

  const [showCredentialError, setShowCredentialError] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dob = `${form.DOB_Year}-${form.DOB_Month}-${form.DOB_Day}`;

  const [trigger, { data: blob, isFetching }] = useLazyGetCaptchaImageQuery();
  const [captchaText, setCaptchaText] = useState('');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const fetchCaptcha = async () => {
    try {
      const blobData = await trigger().unwrap();
      const text = await extractTextFromCaptchaBlob(blobData);
      setCaptchaText(text);
    } catch (err) {
      console.error('Failed to fetch or read CAPTCHA:', err);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = () => {
    setShowError(false);
  };

  const handleDOBChange = (date: any) => {
    const [month, day, year] = date.split('/');
    setShowError(false);
    setErrorMessage('');
    setForm((prev) => ({
      ...prev,
      DOB_Year: year,
      DOB_Month: month,
      DOB_Day: day,
    }));
  };

  const handleValidate = async (data: ForgotPasswordFormValues) => {
    const isCaptchaValid = captchaVerify === captchaText;

    if (!isCaptchaValid) {
      setShowCaptchaError(true);
      return;
    }

    const payload: any = {
      UserName: data.UserName,
      SSNLast5: data.SSNLast5,
      DOB_Day: form.DOB_Day,
      DOB_Month: form.DOB_Month,
      DOB_Year: form.DOB_Year,
    };

    try {
      const response: any = await forgotPassword(payload).unwrap();
      localStorage.setItem('forgotPwdUserName', data.UserName);
      dispatch(setForgotPWDSecurityQuestions(response));
      route.push('/for-your-security'); // Navigate to next step
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(
        err?.data?.Message ||
          err?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  const handleCaptchaChange = (value: string) => {
    setShowCaptchaError(false);
    setCaptchaVerify(value);
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header={FORGOT_PASSWORD}
      >
        {isLoading && <Loader className="mx-auto mb-4" />}
        <div className="flex flex-col p-4 gap-4">
          {(showCredentialError || showCaptchaError) && captchaVerify && (
            <CustomAlert
              type="error"
              description={captchaVerify}
            />
          )}
          {showError && (
            <CustomAlert
              type="error"
              description={errorMessage}
              // className="mb-2"
            />
          )}

          <div className="flex justify-end">
            <b className='!text-[14px]'>
              <span className="px-1 text-[var(--text-error)] ">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data: any) => handleValidate(data))}
          >
            <Card className="customCard flex w-full flex-col gap-3 py-3 sm:flex-row md:p-6 lg:px-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="User ID"
                  mandantory
                  {...register('UserName')}
                  error={errors.UserName?.message}
                  name="UserName"
                  className={
                    showCredentialError
                      ? 'w-full text-[var(--text-error)]'
                      : 'w-full'
                  }
                />
              </div>

              <div className="w-full sm:w-1/2">
                <InputField
                  label="Last 5 Digits of SSN"
                  mandantory
                  className={
                    showCredentialError
                      ? 'w-full text-[var(--text-error)]'
                      : 'w-full'
                  }
                  {...register('SSNLast5')}
                  error={errors.SSNLast5?.message}
                  name="SSNLast5"
                  type="password"
                  maxLength={5}
                />
              </div>
            </Card>

            <Card className="customCard flex w-full gap-3 md:p-6 lg:px-6">
              <div className="w-full sm:w-1/2">
                {/* <InputField
                  label="Date of Birth"
                  mandantory
                  className={
                    showCredentialError
                      ? 'w-full text-[var(--text-error)]'
                      : 'w-full'
                  }
                  {...register('dob', {
                    onChange: (e: any) => {
                      handleDOBChange(e);
                    },
                  })}
                  error={errors.dob?.message}
                  type="date"
                  name="dob"
                  value={dob}
                  max={new Date().toISOString().split('T')[0]}
                /> */}
                <Controller
                  name="dob"
                  control={control}
                  render={({ field, fieldState }: any) => (
                    <DatePicker
                      value={field.value}
                      onChange={(date) => {
                        handleDOBChange(date ? format(date, 'MM/dd/yyyy') : '');
                        field.onChange(date ? format(date, 'MM/dd/yyyy') : '');
                      }}
                      name={field.name}
                      label="Date of Birth"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            </Card>

            <Card className="customCard flex flex-col py-4 md:p-6 lg:px-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="bg-[#000f73] px-[12px] py-1 text-xl text-white">
                    {captchaText || !isFetching ? captchaText : 'Loading...'}
                  </div>

                  <Button
                    onClick={() => fetchCaptcha()}
                    className="!bg-transparent !p-1"
                  >
                    <Image src={Relode} alt="reload-img" />
                  </Button>
                </div>

                <div className="responsive-captcha w-2/3 sm:w-2/3 md:w-1/2 lg:w-1/2">
                  <InputField
                    placeholder="Enter Captcha Code"
                    {...register('captchaInput', {
                      onChange: (e: any) => {
                        handleCaptchaChange(e.target.value);
                      },
                    })}
                    error={errors.captchaInput?.message}
                    name="captchaInput"
                    className={
                      showCaptchaError
                        ? 'w-full text-[var(--text-error)]'
                        : 'w-full'
                    }
                    iconRight={showCaptchaError ? NotSecure : ''}
                  />
                </div>
              </div>

              <p
                className={`mt-1 w-full text-sm sm:w-1/2 ${
                  showCaptchaError ? 'text-[var(--text-error)]' : ''
                }`}
              >
                {PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE}
              </p>
            </Card>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => route.back()}>
                {CANCEL}
              </Button>

              <Button
                variant={isValid ? 'primary' : 'disable'}
                type="submit"
                disabled={!isValid || isLoading}
              >
                {isLoading ? 'Validating...' : 'Validate'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
