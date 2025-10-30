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
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  securityQuestionsSchema,
  type SecurityQuestionsFormValues,
} from '@/schemas/forgotPwdSecurityQuestionsSchema';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import {
  RESET_PASSWORD,
  TO_VERIFY_AND_PROTECT_YOUR_ACCOUNT,
} from '@/constants/forgotPwdSQConstants';
import { Loader } from '@/components/atoms/Loader';

const ForYourSecurityPage = () => {
  const securityQuestions = useSelector(
    (state: RootState) => state.securityQuestions,
  );
  const [validateAnswers, { isLoading }] = useValidateSecurityAnswersMutation();
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

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors, isValid },
  } = useForm<SecurityQuestionsFormValues>({
    resolver: zodResolver(securityQuestionsSchema),
    mode: 'onBlur',
  });

  // ✅ Watch all form values
  const values = useWatch({ control });

  // ✅ Check validity using Zod schema
  const isFormValid = securityQuestionsSchema.safeParse(values).success;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setShowAlert(false);
  };

  const validate = async (data: SecurityQuestionsFormValues) => {
    const payload: any = {
      ...data,
      Question1Id: securityQuestions.Question1Id,
      Question2Id: securityQuestions.Question2Id,
      UserName: localStorage.getItem('forgotPwdUserName') || '',
    };

    try {
      const response: any = await validateAnswers(payload).unwrap();
      if (response?.error) {
        setShowAlert(true);
        setErrorMessage(
          response?.error?.data?.Message ||
            response?.error?.data?.message ||
            'Something went wrong! Please try again.',
        );
      } else {
        router.push('/reset-password');
      }
    } catch (err: any) {
      setShowAlert(true);
      setErrorMessage(
        err?.data?.Message ||
          err?.data?.message ||
          'Something went wrong! Please try again.',
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="For Your Security"
      >
        <div className="flex flex-col gap-4 p-4 !pb-0">
          {showAlert && <CustomAlert type="error" description={errorMessage} />}
          {isLoading && <Loader className="mx-auto mb-4" />}

          <div className="flex justify-end">
            <b className="!text-[14px]">
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm">{TO_VERIFY_AND_PROTECT_YOUR_ACCOUNT}</p>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit((data: any) => validate(data))}
            >
              <Card className="customCard flex flex-col md:p-6 lg:px-6">
                <div className="flex-1">
                  <InputField
                    label={
                      <div className="flex gap-1">
                        <p className="text-black">
                          {securityQuestions?.Question1Text}
                          <span className="text-[var(--text-error)] pr-1">*</span>
                        </p>
                      </div>
                    }
                    {...register('Answer1', {
                      onChange: handleChange,
                    })}
                    onFocus={() => {
                      clearErrors('Answer1');
                    }}
                    error={errors.Answer1?.message}
                    className="w-full border-black text-base text-black sm:w-1/2"
                    name="Answer1"
                  />
                </div>
              </Card>

              <Card className="customCard flex flex-col md:p-6 lg:px-6">
                <div className="flex-1">
                  <InputField
                    label={
                      <div className="flex gap-1">
                        <p className="text-black">
                          {securityQuestions?.Question2Text}
                          <span className="text-[var(--text-error)] pr-1">*</span>
                        </p>
                        
                      </div>
                    }
                    {...register('Answer2', {
                      onChange: handleChange,
                    })}
                    onFocus={() => {
                      clearErrors('Answer2');
                    }}
                    error={errors.Answer2?.message}
                    name="Answer2"
                    className="w-full border-black text-base text-black sm:w-1/2"
                  />
                </div>
              </Card>

              <div className="mb-4 flex h-10 items-center justify-end gap-2">
                <Button
                  variant="outline"
                  className="h-full"
                  onClick={() => router.back()}
                >
                  {CANCEL}
                </Button>

                <Button
                  variant={isFormValid ? 'primary' : 'disable'}
                  className="h-full disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isFormValid || isLoading}
                  type="submit"
                >
                  {RESET_PASSWORD}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForYourSecurityPage;
