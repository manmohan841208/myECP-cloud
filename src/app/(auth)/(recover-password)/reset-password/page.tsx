'use client';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useResetPasswordMutation } from '@/store/services/resetPasswordApi';
import { useDispatch } from 'react-redux';
import { setResetPasswordMessage } from '@/store/slices/resetPasswordSlice';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { LOGIN, SUBMIT } from '@/constants/forgotPwdSQConstants';
import { Loader } from '@/components/atoms/Loader';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/schemas/resetPasswordSchema';
import PasswordRequirements from '@/components/atoms/PwdValidation';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { NotSecure, BlackEyeOpen, BlackEyeClose } from '@/assets/svg';
import Image from '@/components/atoms/Image';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pwdNotSame, setPwdNotSame] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  );

  // ✅ Watch all form values
  const values = useWatch({ control });

  // ✅ Check validity using Zod schema
  const isFormValid = resetPasswordSchema.safeParse(values).success;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const popoverSide = windowWidth <= 768 ? 'bottom' : 'right'; // ✅ mobile threshold

  const resetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    if (isValid) {
      const payload: any = {
        ...data,
        UserName: localStorage.getItem('forgotPwdUserName') || '',
      };

      try {
        const response = await resetPassword(payload).unwrap();
        dispatch(setResetPasswordMessage(response));
        setSuccessMessage(response);
        setShowSuccessAlert(true);
        localStorage.removeItem('forgotPwdUserName');
      } catch (err: any) {
        setShowAlert(true);
        setErrorMessage(
          err?.data?.Message ||
            err?.data?.message ||
            'Something went wrong! Please try again.',
        );
      }
    }
  };
  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header={showSuccessAlert ? 'MyECP Password Reset' : 'Reset Password'}
      >
        <div className="flex flex-col gap-4 p-4 !pb-0">
          {showAlert ? (
            <CustomAlert type="error" description={errorMessage} />
          ) : (
            ''
          )}

          {showSuccessAlert ? (
            <CustomAlert
              type="success"
              description={successMessage}
              className="mb-2"
            />
          ) : (
            ''
          )}

          {isLoading && <Loader className="mx-auto mb-4" />}

          {showSuccessAlert ? null : (
            <div className="flex justify-end">
              <b className="!text-[14px]">
                <span className="px-1 text-[var(--text-error)]">*</span>
                {REQUIRED_FIELDS}
              </b>
            </div>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data: any) => resetPasswordSubmit(data))}
          >
            {showSuccessAlert ? null : (
              <Card className="customCard flex flex-col gap-4 sm:flex-row md:p-6 lg:px-6">
                <div className="w-full sm:w-1/2">
                  <Popover open={open}>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <InputField
                          label="New Password"
                          mandantory={true}
                          {...register('NewPassword', {
                            onChange: (e) => {
                              setPassword(e.target.value);
                            },
                            onBlur: () => setOpen(false),
                          })}
                          type={showNewPassword ? 'text' : 'password'}
                          error={errors.NewPassword?.message}
                          name="NewPassword"
                          className="w-full"
                          onFocus={() => {
                            clearErrors('NewPassword');
                            setOpen(true);
                          }}
                          iconRight={
                            errors.NewPassword?.message
                              ? NotSecure
                              : showNewPassword
                                ? BlackEyeClose
                                : BlackEyeOpen
                          }
                          onIconClick={() => {
                            if (errors.NewPassword?.message) {
                              return;
                            } else {
                              setShowNewPassword((prev) => !prev);
                            }
                          }}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      side={popoverSide}
                      align="start"
                      className="w-[194px] !rounded-[4px] border-[#cccccc] bg-[#F1F1F1] p-0"
                      onOpenAutoFocus={(e) => e.preventDefault()} // ✅ Prevent focus shift
                      onCloseAutoFocus={(e) => e.preventDefault()} // ✅ Prevent focus shift back
                    >
                      <PasswordRequirements password={password} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-full sm:w-1/2">
                  <InputField
                    label="Confirm Password"
                    mandantory={true}
                    {...register('ConfirmPassword')}
                    error={errors.ConfirmPassword?.message}
                    name="ConfirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full"
                    onFocus={() => {
                      clearErrors('ConfirmPassword');
                    }}
                    iconRight={
                      errors.ConfirmPassword?.message
                        ? NotSecure
                        : showConfirmPassword
                          ? BlackEyeClose
                          : BlackEyeOpen
                    }
                    onIconClick={() => {
                      if (errors.ConfirmPassword?.message) {
                        return;
                      } else {
                        setShowConfirmPassword((prev) => !prev);
                      }
                    }}
                  />
                </div>
              </Card>
            )}

            <div className="flex items-center justify-end gap-2 pb-4">
              {!showSuccessAlert ? (
                <>
                  <Button variant="outline" onClick={() => router.back()}>
                    {CANCEL}
                  </Button>

                  <Button
                    variant={isFormValid ? 'primary' : 'disable'}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    {SUBMIT}
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => router.push('/login')}>
                  {LOGIN}
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
