'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Email, Phone } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomCheckbox from '@/components/atoms/Checkbox';
// import CustomAccordion from "@/components/atoms/Accordion";
import { useRouter } from 'next/navigation';
import { useSendOtpMutation } from '@/store/services/sendOtpApi';
import maskEmail from '@/utils/maskEmail';
import maskPhone from '@/utils/maskPhone';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useDispatch } from 'react-redux';
import { setSelectedOption, setOtpResponse } from '@/store/slices/sendOtpSlice';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  twoFactorSchema,
  type TwoFactorFormValues,
} from '@/schemas/twoFactorSchema';
import type { SendOtpPayload } from '@/types/twoFactorTypes';
import { set } from 'zod';
import { Loader } from '@/components/atoms/Loader';
import {
  CANCEL,
  CONTINUE,
  EMAIL,
  PHONE,
  REQUIRED_FIELDS,
  SELECT_DELIVERY_METHOD,
} from '@/constants/commonConstants';
import {
  FOR_YOUR_ADDED_SECURITY,
  PLEASE_CALL_IF_YOU_NO_LONGER_HAVE_ACCESS_TO_THIS_EMAIL_OR_PHONE,
  WE_NEED_TO_CONFIRM_ITS_YOU,
  YOU_ARE_NOT_ENROLLED_TO_RECIEVE_2FA_CODE_VIA_TEXT,
  YOU_CAN_ENROLL_BY_GOING_TO_MY_PROFILE_ANYTIME,
} from '@/constants/twoFactorConstants';

const TwoFactorAuthPage = () => {
  const route = useRouter();
  const userData: any = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [sendOtpTrigger, { data, isLoading, error }] = useSendOtpMutation();
  const [selectedOtpOption, setSelectedOtpOption] = React.useState<
    'Email' | 'SMS' | ''
  >('');
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorSchema),
    mode: 'onChange',
    defaultValues: {
      otpOption: userData?.IsSMSOptIn
        ? 'SMS'
        : userData?.IsTwoFAEmailOptIn
          ? 'Email'
          : '',
    },
  });

  const otpOption = watch('otpOption');

  const dispatch = useDispatch();

  const onOtpOptionChange = (value: 'Email' | 'SMS') => {
    setValue('otpOption', value);
    setShowError(false);
  };

  const sendOtp = async (data: TwoFactorFormValues) => {
    if (!data?.otpOption) {
      setShowError(true);
      return;
    }
    try {
      const payload: SendOtpPayload = {
        UserId: userData?.UserId?.toString(),
        OtpOption: data?.otpOption,
      };

      const response = await sendOtpTrigger(payload).unwrap();
      if (response?.Otp) {
        dispatch(setSelectedOption(data?.otpOption));
        dispatch(setOtpResponse(response?.Otp));
        route.push('/login/2FA/code-entry');
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(
        err?.data?.message || `Oops! Something went wrong. Please try again.`,
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header={FOR_YOUR_ADDED_SECURITY}
      >
        {isLoading && <Loader className="mx-auto mb-4" />}
        <div className="flex flex-col gap-4 px-4">
          {showError ||
            (errors?.otpOption && (
              <CustomAlert
                type="error"
                className="mt-3"
                description={
                  errorMessage
                    ? errorMessage
                    : `Please select an option to recieve the OTP.`
                }
              />
            ))}
          <div className="flex justify-end pt-4">
            <b className="!text-[14px]">
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <p className="text-sm sm:!text-base">{WE_NEED_TO_CONFIRM_ITS_YOU}</p>

          <Card
            className="w-full bg-[var(--color-white)] !p-0"
            header={
              <>
                {SELECT_DELIVERY_METHOD}{' '}
                <span className="text-[var(--text-error)]">*</span>
              </>
            }
          >
            <div className="px-3">
              <div className="flex flex-col py-[40px]">
                <RadioGroup
                  className="flex flex-col gap-[40px]"
                  value={watch('otpOption')}
                  {...register('otpOption')}
                  onValueChange={(value) =>
                    onOtpOptionChange(value as 'Email' | 'SMS')
                  }
                >
                  <div className={`flex items-center gap-3 pl-4`}>
                    <div
                      className={`flex h-15 w-15 items-start justify-center ${userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                    >
                      <Image
                        src={Phone}
                        alt="phone-img"
                        className={` ${userData?.IsSMSOptIn ? '' : 'opacity-35'}`}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="mobile"
                        className={`text-base font-bold ${userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                      >
                        {PHONE}
                      </Label>
                      <div className="flex items-center justify-start gap-1">
                        <RadioGroupItem
                          value="SMS"
                          id="mobile"
                          checked={
                            userData?.IsSMSOptIn && !userData?.IsTwoFAEmailOptIn
                              ? true
                              : false
                          }
                          disabled={!userData?.IsSMSOptIn}
                        />
                        <span
                          className={` ${userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                        >
                          {maskPhone(
                            userData?.MobileNo
                              ? userData?.MobileNo
                              : '00000000000',
                          )}
                        </span>
                      </div>
                      <div
                        className={`pl-4 ${userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                      >
                        <p>
                          {YOU_ARE_NOT_ENROLLED_TO_RECIEVE_2FA_CODE_VIA_TEXT}
                        </p>
                        <p>{YOU_CAN_ENROLL_BY_GOING_TO_MY_PROFILE_ANYTIME}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-4">
                    <div
                      className={`flex h-15 w-15 items-center justify-center ${userData?.IsTwoFAEmailOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                    >
                      <Image
                        src={Email}
                        alt="email-img"
                        className={` ${userData?.IsTwoFAEmailOptIn ? '' : 'opacity-35'}`}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className={`text-base font-bold ${userData?.IsTwoFAEmailOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                      >
                        {EMAIL}
                      </Label>
                      <div className="flex items-center justify-center gap-1">
                        <RadioGroupItem
                          value="Email"
                          id="email"
                          checked={
                            userData?.IsTwoFAEmailOptIn && !userData?.IsSMSOptIn
                              ? true
                              : false
                          }
                          disabled={!userData?.IsTwoFAEmailOptIn}
                        />
                        <span
                          className={` ${userData?.IsTwoFAEmailOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                        >
                          {maskEmail(userData?.EmailAddress)}
                        </span>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="pb-6 text-sm">
                {
                  PLEASE_CALL_IF_YOU_NO_LONGER_HAVE_ACCESS_TO_THIS_EMAIL_OR_PHONE
                }
              </div>
            </div>
          </Card>
          <div className="flex items-center justify-end pb-4">
            {/* <div>
              <CustomCheckbox label="Remember Device" className="!text-sm" />
            </div> */}
            <div className="flex h-10 items-center justify-center gap-2">
              <Button
                variant={'outline'}
                className="h-full"
                onClick={() => route.back()}
              >
                {CANCEL}
              </Button>

              <Button
                variant={!otpOption || isLoading ? 'disable' : 'primary'}
                onClick={handleSubmit(sendOtp)}
                className="h-full"
                disabled={!otpOption || isLoading}
              >
                {CONTINUE}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorAuthPage;
