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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { Loader } from '@/components/atoms/Loader';
import { FORGOT_PASSWORD } from '@/constants/forgotPasswordConstants';
import { PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE } from '@/constants/forgotUserIdConstants';
import { set } from 'zod';

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
  const isFormValid = form.UserName && form.SSNLast5 && dob && captchaVerify;

  const [trigger, { data: blob, isFetching }] = useLazyGetCaptchaImageQuery();
  const [captchaText, setCaptchaText] = useState('');

  const {
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

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split('-');
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
      LastName: data.UserName,
      SSNLast5: data.SSNLast5,
      DOB_Day: form.DOB_Day,
      DOB_Month: form.DOB_Month,
      DOB_Year: form.DOB_Year,
    };

    try {
      const response: any = await forgotPassword(payload).unwrap();
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
        <div className="flex flex-col p-6 sm:gap-4">
          {(showCredentialError || showCaptchaError) && captchaVerify && (
            <CustomAlert type="error" description={captchaVerify}  className='mb-2'/>
          )}
          {showError && <CustomAlert type="error" description={errorMessage}  className='mb-2'/>}

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
          <Card className="customCard flex w-full flex-col gap-3 lg:px-6 py-3 sm:flex-row md:p-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="User ID"
                  mandantory
                  {...register('UserName')}
                  error={errors.UserName?.message}
                  name="UserName"
                className={
                  showCredentialError ? 'text-[var(--text-error)] w-full' : 'w-full'
                }
                  onChange={handleChange}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <InputField
                  label="Last 5 Digits of SSN"
                  mandantory
                  className={
                  showCredentialError ? 'text-[var(--text-error)] w-full' : 'w-full'
                }
                  {...register('SSNLast5')}
                  error={errors.SSNLast5?.message}
                  name="SSNLast5"
                  type="password"
                  maxLength={5}
                  onChange={handleChange}
                />
              </div>
            </Card>

          <Card className="customCard flex w-full gap-3 lg:px-6 md:p-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Date of Birth"
                  mandantory
                  className={
                    showCredentialError ? 'text-[var(--text-error)] w-full' : 'w-full'
                  }
                  {...register('dob')}
                  error={errors.dob?.message}
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={handleDOBChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </Card>

          <Card className="customCard flex flex-col lg:px-6 py-4 md:p-6">
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

              <div className="w-2/3 sm:w-2/3 md:w-1/2 lg:w-1/2 ">
                  <InputField
                    placeholder="Enter Captcha Code"
                    {...register('captchaInput')}
                    error={errors.captchaInput?.message}
                    name="captchaInput"
                    onChange={(e) => handleCaptchaChange(e.target.value)}
                    className={
                      showCaptchaError ? 'text-[var(--text-error)] w-full' : 'w-full'
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
