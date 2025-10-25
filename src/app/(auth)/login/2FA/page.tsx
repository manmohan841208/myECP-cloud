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

interface UserInfo {
  UserId: number;
  FirstName: string | null;
  LastName: string | null;
  IsSecurityQuestionsNeeded: boolean;
  Is2FANeeded: boolean;
  IsTwoFAOtpIn: boolean;
  IsTwoFAEmailOptIn: boolean;
  IsSMSOptIn: boolean;
  EmailAddress: string;
  MobileNo: string | null;
  CID: string | null;
  IsPrimaryUser: boolean;
  AccountFirstName: string;
  AccountMiddleName: string;
  AccountLastName: string;
}

const TwoFactorAuthPage = () => {
  const route = useRouter();
  const userData: any = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [sendOtpTrigger, { data, isLoading, error }] = useSendOtpMutation();
  const [selectedOtpOption, setSelectedOtpOption] = React.useState<
    'Email' | 'SMS' | ''
  >('');
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const dispatch = useDispatch();

  const sendOtp = async () => {
    try {
      const payload: any = {
        UserId: userData?.UserId?.toString(),
        OtpOption: selectedOtpOption,
      };

      const response = await sendOtpTrigger(payload).unwrap();
      if (response?.Otp) {
        dispatch(setSelectedOption(selectedOtpOption));
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
        header="For Your Added Security"
      >
        <div className="flex flex-col gap-4 px-4">
          {showError && (
            <CustomAlert
              type="error"
              className="mt-3"
              description={
                errorMessage
                  ? errorMessage
                  : `We're sorry! The code you entered is either expired or invalid. Please try again.`
              }
            />
          )}
          <div className="flex justify-end pt-3">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p className="text-sm sm:!text-base">
            We need to confirm it’s really you. As part of the two-factor
            authentication process, we’ll send you an authentication code
            through one of the below delivery methods.
          </p>

          <Card
            className="w-full bg-[var(--color-white)] !p-0"
            header={
              <>
                Select Delivery Method{' '}
                <span className="text-[var(--text-error)]">*</span>
              </>
            }
          >
            <div className="px-3">
              <div className="flex flex-col py-9">
                <RadioGroup
                  className="flex flex-col gap-9"
                  value={selectedOtpOption}
                  onValueChange={(value) =>
                    setSelectedOtpOption(value === 'Email' ? 'Email' : 'SMS')
                  }
                >
                  {userData?.MobileNo ? (
                    <div
                      className={`flex items-center gap-3 pl-4 ${!userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                    >
                      <div className="flex h-15 w-15 items-start justify-center">
                        <Image
                          src={Phone}
                          alt="phone-img"
                          className="opacity-35"
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile" className="text-base font-bold">
                          Phone
                        </Label>
                        <div className="flex items-center justify-start gap-1">
                          <RadioGroupItem value="SMS" id="mobile" />
                          <span>{maskPhone(userData?.MobileNo)}</span>
                        </div>
                        <div className="pl-4">
                          <p>
                            You are not enrolled to receive 2FA code via text.
                          </p>
                          <p>
                            You can enroll by going to My Profile at anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {userData?.EmailAddress ? (
                    <div className="flex items-center gap-3 pl-4">
                      <div
                        className={`flex h-15 w-15 items-center justify-center ${userData?.IsSMSOptIn ? '' : 'text-[var(--color-disabled-text)]'}`}
                      >
                        <Image src={Email} alt="email-img" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base font-bold">
                          Email
                        </Label>
                        <div className="flex items-center justify-center gap-1">
                          <RadioGroupItem value="Email" id="email" />
                          <span>{maskEmail(userData?.EmailAddress)}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </RadioGroup>
              </div>

              <div className="pb-5 text-sm">
                Please call 1-877-891-7827 If you no longer have access to this
                email address or phone number
              </div>
            </div>
          </Card>
          <div className="flex items-center justify-between pb-4">
            <div>
              <CustomCheckbox label="Remember Device" className="!text-sm" />
            </div>
            <div className="flex h-10 items-center justify-center gap-2">
              <Button
                variant={'outline'}
                className="h-full"
                onClick={() => route.back()}
              >
                Cancel
              </Button>

              <Button
                variant={
                  !selectedOtpOption || isLoading ? 'disable' : 'primary'
                }
                onClick={() => sendOtp()}
                className="h-full"
                disabled={!selectedOtpOption || isLoading}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorAuthPage;
