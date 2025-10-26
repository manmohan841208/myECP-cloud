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
import { useLazyGetCaptchaImageQuery } from '@/store/services/getCaptchaApi';
import { extractTextFromCaptchaBlob } from '@/utils/blobToText';
import { useForgotUserNameMutation } from '@/store/services/forgotUserNameApi';
import { useDispatch } from 'react-redux';
import { setForgotUserName } from '@/store/slices/forgotUserNameSlice';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotUserIdSchema,
  type ForgotUserIdFormValues,
} from '@/schemas/forgotUserNameSchema';
import { PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE } from '@/constants/forgotUserIdConstants';
import { Loader } from '@/components/atoms/Loader';

// import DatePicker from '@/components/atoms/Calendar/page';

export default function RecoverUserIDPage() {
  const route = useRouter();

  const [forgotUserName, { isLoading }] = useForgotUserNameMutation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    LastName: '',
    SSNLast5: '',
    DOB_Day: '',
    DOB_Month: '',
    DOB_Year: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotUserIdFormValues>({
    resolver: zodResolver(forgotUserIdSchema),
    mode: 'onChange',
  });

  const [showCredentialError, setShowCredentialError] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [trigger, { data: blob, isFetching }] = useLazyGetCaptchaImageQuery();
  const [captchaText, setCaptchaText] = useState('');
  const [captchaVerify, setCaptchaVerify] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dob = `${form.DOB_Year}-${form.DOB_Month}-${form.DOB_Day}`;

  const fetchCaptcha = async () => {
    try {
      const blobData = await trigger().unwrap();
      const text = await extractTextFromCaptchaBlob(blobData);
      setCaptchaText(text);
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err);
    }
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split('-');
    setShowError(false);
    setErrorMessage('');
    setForm((prev) => ({
      ...prev,
      DOB_Year: year,
      DOB_Month: month,
      DOB_Day: day,
    }));
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleValidate = async (data: ForgotUserIdFormValues) => {
    const isCaptchaValid = captchaVerify === captchaText;

    if (!isCaptchaValid) {
      setShowCaptchaError(true);
      return;
    } else {
      setShowCaptchaError(false);
    }

    const payload = {
      LastName: data.LastName,
      SSNLast5: data.SSNLast5,
      DOB_Day: form.DOB_Day,
      DOB_Month: form.DOB_Month,
      DOB_Year: form.DOB_Year,
    };
    try {
      const response = await forgotUserName(payload).unwrap();
      setShowCredentialError(false);
      dispatch(setForgotUserName(response.UserName));
      route.push('/forgot-success-userid');
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
    <div className="p-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="Forgot User ID?"
      >
        {isLoading && <Loader className="mx-auto mb-4" />}
        <div className="flex flex-col p-6 sm:gap-4">
          {captchaVerify && (showCredentialError || showCaptchaError) && (
            <CustomAlert type="error" description={captchaVerify} />
          )}

          {showError && <CustomAlert type="error" description={errorMessage} />}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data: any) => handleValidate(data))}
          >
            <Card className="customCard flex w-full flex-col gap-3 px-6 py-3 sm:flex-row md:p-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Last Name"
                  mandantory
                  {...register('LastName')}
                  error={errors.LastName?.message}
                  name="LastName"
                  // value={form.LastName}
                  className={
                    showCredentialError ? 'text-[var(--text-error)]' : ''
                  }
                />
              </div>

              <div className="w-full sm:w-1/2">
                <InputField
                  label="Last 5 Digits of SSN"
                  mandantory
                  className={
                    showCredentialError ? 'text-[var(--text-error)]' : ''
                  }
                  {...register('SSNLast5')}
                  error={errors.SSNLast5?.message}
                  name="SSNLast5"
                  type="password"
                  maxLength={5}
                />
              </div>
            </Card>

            <Card className="customCard flex w-full gap-3 px-6 md:p-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Date of Birth"
                  mandantory
                  className={
                    showCredentialError ? 'text-[var(--text-error)]' : ''
                  }
                  {...register('dob')}
                  error={errors.dob?.message}
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split('T')[0]}
                  onChange={handleDOBChange}
                />
                {/* <DatePicker /> */}
              </div>
            </Card>

            <Card className="customCard flex flex-col px-6 py-4 sm:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="bg-[#000f73] px-[12px] py-1 text-xl text-white">
                    {captchaText || (isFetching ? 'Loading...' : '')}
                  </div>

                  <Button
                    onClick={() => fetchCaptcha()}
                    className="!bg-transparent !p-1"
                  >
                    <Image src={Relode} alt="relode-img" />
                  </Button>
                </div>

                <div className="w-1/2">
                  <InputField
                    placeholder="Enter Captcha Code"
                    {...register('captchaInput')}
                    error={errors.captchaInput?.message}
                    name="captchaInput"
                    onChange={(e) => handleCaptchaChange(e.target.value)}
                    className={
                      showCaptchaError ? 'text-[var(--text-error)]' : ''
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
