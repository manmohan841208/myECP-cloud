'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '@/components/atoms/Checkbox';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useVerifySecurityQuestionMutation } from '@/store/services/verifySecurityQuestionApi';
import { useSelector } from 'react-redux';

export default function SecurityForm() {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const rememberMe = useSelector((state: any) => {
    return state?.login?.rememberMe;
  });

  const [verifySecurityQuestion, { data, isLoading, error }] =
    useVerifySecurityQuestionMutation();

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const userInfo = JSON.parse(stored);
      setUserInfo(userInfo);
      setSecurityQuestion(userInfo?.Question || '');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    if (answer.trim().length === 0) {
      setErrorMessage('Please provide an answer to the security question.');
      setShowError(true);
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const payload = {
      UserId: userInfo?.UserId || '',
      QuestionID: userInfo?.QuestionID || 0,
      Answer: answer,
      RememberDevice: rememberDevice,
      RememberUserID: rememberMe ? rememberMe : false,
    };

    try {
      const response: any = await verifySecurityQuestion(payload).unwrap();
      if (response?.Message) {
        setErrorMessage(
          response?.Message
            ? response?.Message
            : 'Oops! The answer you entered is incorrect.',
        );
      } else {
        localStorage.setItem('userInfo', response);
        router.push('/account-summary');
      }
    } catch (err: any) {
      setErrorMessage(
        err?.data?.Message
          ? err?.data?.Message
          : 'Oops! The answer you entered is incorrect.',
      );
      setShowError(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !px-0 md:max-w-[860px]"
        header="For Your Added Security"
      >
        <div className="flex flex-col gap-4 px-4">
          {showError && (
            <CustomAlert
              type="error"
              className="mt-3"
              description={errorMessage}
            />
          )}

          <div className="flex justify-end pt-3">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p className="text-sm sm:!text-base">
            We need to confirm it&apos; really you. To verify and protect your
            account, please answer your security question.
          </p>

          <form className="" onSubmit={handleLogin}>
            <Card className="flex flex-col gap-3 border-t-4 border-t-[#D3D3D3] bg-white px-[38px] pt-9 pb-6">
              <InputField
                type="text"
                value={answer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAnswer(e.target.value)
                }
                label={
                  <>
                    {securityQuestion ? securityQuestion : ''}{' '}
                    <span className="text-[var(--text-error)]">*</span>
                  </>
                }
                className="w-full border-[2px] border-[var(--primary-color)] sm:w-[47.95%]"
              />

              <div>
                <CustomCheckbox
                  label="Remember Device"
                  className="!text-sm"
                  checked={rememberDevice}
                  onChange={() => {
                    setRememberDevice(!rememberDevice);
                  }}
                />
              </div>

              <p className="text-sm sm:!text-base">
                Do not select this option if you are using a public computer,
                such as in a library.
              </p>
            </Card>

            <div className="flex items-center justify-end gap-2 py-4">
              <Button
                variant={'outline'}
                className="h-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                variant={answer.length > 2 ? 'primary' : 'disable'}
                onClick={(e: any) => {
                  if (securityQuestion.length <= 2) {
                    e.preventDefault();
                    setErrorMessage(
                      'Please first fill the security question, then continue.',
                    );
                    setShowError(true);
                  }
                }}
                disabled={answer.length > 2 ? false : true}
                className="h-full"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
