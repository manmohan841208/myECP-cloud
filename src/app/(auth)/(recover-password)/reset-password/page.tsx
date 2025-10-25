'use client';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useResetPasswordMutation } from '@/store/services/resetPasswordApi';
import { useDispatch } from 'react-redux';
import { setResetPasswordMessage } from '@/store/slices/resetPasswordSlice';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    NewPassword: '',
    ConfirmPassword: '',
    UserName: localStorage.getItem('forgotPwdUserName') || '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pwdNotSame, setPwdNotSame] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMessage('');
    setShowAlert(false);
    setPwdNotSame('');
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = form.NewPassword && form.ConfirmPassword;

  const resetPasswordSubmit = async () => {
    if (isFormValid) {
      if (form.NewPassword !== form.ConfirmPassword) {
        setPwdNotSame(
          'Your passwords do not match. Please re-enter your passwords.',
        );
        setShowAlert(false);
      } else {
        try {
          const response: any = await resetPassword(form).unwrap();
          if (response) {
            dispatch(setResetPasswordMessage(response));
            setSuccessMessage(response);
            setShowSuccessAlert(true);
          }
        } catch (err: any) {
          setShowAlert(true);
          setErrorMessage(
            err?.data?.Message
              ? err?.data?.Message
              : err?.data?.message || 'Something went wrong! Please try again.',
          );
        }
      }
    } else {
      setErrorMessage('Please fill in all required fields.');
    }
  };

  return (
    <div className="p-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header={showSuccessAlert ? 'MyECP Password Reset' : 'For Your Security'}
      >
        <div className="flex flex-col p-6 !pb-0 sm:gap-4">
          {showAlert ? (
            <CustomAlert type="error" description={errorMessage} />
          ) : (
            ''
          )}

          {showSuccessAlert ? (
            <CustomAlert type="success" description={successMessage} />
          ) : (
            ''
          )}

          {showSuccessAlert ? null : (
            <div className="flex justify-end">
              <b>
                <span className="px-1 text-[var(--text-error)]">*</span>Required
                Fields
              </b>
            </div>
          )}

          {showSuccessAlert ? null : (
            <Card className="customCard flex w-full flex-col gap-3 px-6 py-3 sm:flex-row md:p-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="New Password"
                  mandantory={true}
                  name="NewPassword"
                  onChange={handleChange}
                  value={form.NewPassword}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <InputField
                  label="Confirm Password"
                  mandantory={true}
                  name="ConfirmPassword"
                  type="password"
                  onChange={handleChange}
                  value={form.ConfirmPassword}
                  error={pwdNotSame ? pwdNotSame : undefined}
                />
              </div>
            </Card>
          )}

          <div className="flex items-center justify-end gap-2 pb-4">
            {!showSuccessAlert ? (
              <>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>

                <Button
                  variant={isFormValid ? 'primary' : 'disable'}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => resetPasswordSubmit()}
                  disabled={!isFormValid}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => router.push('/login')}>
                Login
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
