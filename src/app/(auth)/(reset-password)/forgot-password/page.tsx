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
    setError,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      UserName: '',
      SSNLast5: '',
      DOB: '',
      captchaInput: '',
    },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'UserName') {
      localStorage.setItem('forgotPwdUserName', value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
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

  const handleValidate = async () => {
    const isCaptchaValid = captchaVerify === captchaText;

    if (!isCaptchaValid) {
      setShowCaptchaError(true);
      return;
    }

    try {
      const response: any = await forgotPassword(form).unwrap();
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
        header="Forgot Password?"
      >
        <div className="flex flex-col p-6 sm:gap-4">
          {(showCredentialError || showCaptchaError) && captchaVerify && (
            <CustomAlert type="error" description={captchaVerify} />
          )}
          {showError && <CustomAlert type="error" description={errorMessage} />}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <Card className="customCard flex w-full flex-col gap-3 px-6 py-3 sm:flex-row md:p-6">
            <div className="w-full sm:w-1/2">
              <InputField
                label="User ID"
                mandantory
                error={showCredentialError ? '' : undefined}
                onChange={handleChange}
                name="UserName"
                value={form.UserName}
                className={
                  showCredentialError ? 'text-[var(--text-error)]' : ''
                }
              />
            </div>

            <div className="w-full sm:w-1/2">
              <InputField
                label="Last 5 Digits of SSN"
                mandantory
                error={showCredentialError ? '' : undefined}
                className={
                  showCredentialError ? 'text-[var(--text-error)]' : ''
                }
                onChange={handleChange}
                name="SSNLast5"
                type="password"
                maxLength={5}
                value={form.SSNLast5}
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
                error={showCredentialError ? '' : undefined}
                type="date"
                name="dob"
                value={dob}
                onChange={handleDOBChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </Card>

          <Card className="customCard flex flex-col px-6 py-4 sm:p-6">
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

              <div className="w-1/2">
                <InputField
                  placeholder="Enter Captcha Code"
                  value={captchaVerify}
                  name="captchaInput"
                  onChange={(e) => handleCaptchaChange(e.target.value)}
                  error={showCaptchaError ? '' : undefined}
                  className={showCaptchaError ? 'text-[var(--text-error)]' : ''}
                  iconRight={showCaptchaError ? NotSecure : ''}
                />
              </div>
            </div>

            <p
              className={`mt-1 w-full text-sm sm:w-1/2 ${
                showCaptchaError ? 'text-[var(--text-error)]' : ''
              }`}
            >
              Please enter the string as shown above before clicking on
              "Validate"
            </p>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => route.back()}>
              Cancel
            </Button>

            <Button
              variant={isFormValid ? 'primary' : 'disable'}
              onClick={handleValidate}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Validating...' : 'Validate'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
