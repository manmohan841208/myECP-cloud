'use client';

import CustomAlert from '@/components/atoms/AlertMessage';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useValidateSecurityAnswersMutation } from '@/store/services/validateSQApi';

const ForYourSecurityPage = () => {
  const securityQuestions = useSelector(
    (state: RootState) => state.securityQuestions,
  );
  const [validateAnswers] = useValidateSecurityAnswersMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [form, setForm] = useState<any>({
    Question1Id: securityQuestions.Question1Id,
    Question1Text: securityQuestions.Question1Text,
    Answer1: '',
    Question2Id: securityQuestions.Question2Id,
    Question2Text: securityQuestions.Question2Text,
    Answer2: '',
    UserName: localStorage.getItem('forgotPwdUserName') || '',
  });

  const isFormValid = form.Answer1 && form.Answer2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setShowAlert(false);
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
      UserName: localStorage.getItem('forgotPwdUserName') || '',
    }));
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response: any = await validateAnswers(form).unwrap();
        if (response?.error) {
          setShowAlert(true);
          setErrorMessage(
            response?.error?.data?.Message
              ? response?.error?.data?.Message
              : response?.error?.data?.message ||
                  'Something went wrong! Please try again.',
          );
        } else {
          router.push('/reset-password');
        }
      } catch (err: any) {
        setShowAlert(true);
        setErrorMessage(
          err?.data?.Message
            ? err?.data?.Message
            : err?.data?.message || 'Something went wrong! Please try again.',
        );
      }
    } else {
      setShowAlert(true);
      setErrorMessage('Please answer all security questions.');
    }
  };

  return (
    <div className="p-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="For Your Security"
      >
        <div className="flex flex-col p-6 !pb-0 sm:gap-4">
          {showAlert && <CustomAlert type="error" description={errorMessage} />}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p>
            To verify and protect your account, please answer your security
            questions.
          </p>

          <Card className="flex w-full bg-[var(--color-white)] p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">
                      {securityQuestions?.Question1Text}
                    </p>
                    <span className="text-[var(--text-error)]">*</span>
                  </div>
                }
                error={isFormValid ? '' : undefined}
                className="w-full border-black text-base text-black sm:w-1/2"
                value={form.Answer1}
                name="Answer1"
                onChange={handleChange}
              />
            </div>
          </Card>

          <Card className="flex w-full bg-[var(--color-white)] p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">
                      {securityQuestions?.Question2Text}
                    </p>
                    <span className="">*</span>
                  </div>
                }
                name="Answer2"
                error={isFormValid ? '' : undefined}
                className="w-full border-black text-base text-black sm:w-1/2"
                value={form.Answer2}
                onChange={handleChange}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 pb-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button
              variant={!isFormValid ? 'disable' : 'primary'}
              className="disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isFormValid}
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
