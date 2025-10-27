'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useEffect, useState } from 'react';
import CustomCheckbox from '@/components/atoms/Checkbox';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useVerifySecurityQuestionMutation } from '@/store/services/verifySecurityQuestionApi';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  securityQuestionSchema,
  type SecurityQuestionFormValues,
} from '@/schemas/securityQuestionSchema';
import type { SecurityQuestionPayload } from '@/types/securityQuestionsType';
import { Loader } from '@/components/atoms/Loader';
import {
  login as loggedIn,
  setAuthFromStorage,
} from '@/store/slices/authSlice';
import {
  DO_NOT_SELECT_THIS_OPTION_IF_YOU_ARE_USING_A_PUBLIC_COMPUTER,
  FOR_YOUR_ADDED_SECURITY,
  REMEMBER_DEVICE,
  WE_NEED_TO_CONFIRM_ITS_REALLY_YOU,
} from '@/constants/securityQuestionsConstants';
import { CANCEL, CONTINUE, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { setSession } from '@/lib/session';

export default function SecurityForm() {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const dispatch = useDispatch();

  const rememberMe = useSelector((state: any) => {
    return state?.login?.rememberMe;
  });

  const [verifySecurityQuestion, { data, isLoading, error }] =
    useVerifySecurityQuestionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SecurityQuestionFormValues>({
    resolver: zodResolver(securityQuestionSchema),
    mode: 'onChange',
    defaultValues: {
      answer: '',
      rememberDevice: false,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const userInfo = JSON.parse(stored);
      setUserInfo(userInfo);
      setSecurityQuestion(userInfo?.Question || '');
    }
  }, []);

  const handleLogin = async (data: SecurityQuestionFormValues) => {
    const payload: SecurityQuestionPayload = {
      UserId: userInfo?.UserId || '',
      QuestionID: userInfo?.QuestionID || 0,
      Answer: data.answer,
      RememberDevice: rememberDevice,
      RememberUserID: rememberMe || false,
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
        localStorage.setItem(
          'rememberDevice',
          rememberDevice ? 'true' : 'false',
        );
        setSession(response?.Token);
        localStorage.setItem('userInfo', response);
        dispatch(setAuthFromStorage(response?.Token));
        dispatch(loggedIn());
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
        header={FOR_YOUR_ADDED_SECURITY}
      >
        {isLoading && <Loader className="mx-auto mb-4" />}
        <div className="flex flex-col gap-4 px-4">
          {showError && (
            <CustomAlert
              type="error"
              className="mt-2"
              description={errorMessage}
            />
          )}

          <div className="flex justify-end ">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <p className="text-sm sm:!text-base">
            {WE_NEED_TO_CONFIRM_ITS_REALLY_YOU}
          </p>

          <form
            className=""
            onSubmit={handleSubmit((data: any) => handleLogin(data))}
          >
            <Card className="flex flex-col gap-3 border-t-4 border-t-[#D3D3D3] bg-white px-[38px] pt-9 pb-6">
              <InputField
                type="text"
                {...register('answer')}
                label={
                  <>
                    {securityQuestion ? securityQuestion : ''}{' '}
                    <span className="text-[var(--text-error)]">*</span>
                  </>
                }
                className="w-full border-[2px] border-[var(--primary-color)] "
              />

              {errors.answer && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.answer.message}
                </p>
              )}

              <div>
                <CustomCheckbox
                  label={REMEMBER_DEVICE}
                  className="!text-sm"
                  checked={rememberDevice}
                  onChange={() => {
                    setRememberDevice(!rememberDevice);
                  }}
                />
              </div>

              <p className="text-sm sm:!text-base">
                {DO_NOT_SELECT_THIS_OPTION_IF_YOU_ARE_USING_A_PUBLIC_COMPUTER}
              </p>
            </Card>

            <div className="flex items-center justify-end gap-2 py-4">
              <Button
                variant={'outline'}
                className="h-full"
                onClick={() => router.back()}
              >
                {CANCEL}
              </Button>
              <Button
                variant={isValid ? 'primary' : 'disable'}
                disabled={!isValid || isLoading}
                className="h-full"
                type="submit"
              >
                {CONTINUE}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
