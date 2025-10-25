

'use client';
import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import { Relode } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomAlert from '@/components/atoms/AlertMessage';
import {NotSecure} from '@/assets/svg'
import { useRouter } from 'next/navigation';
// import DatePicker from '@/components/atoms/Calendar/page';


export default function SuccessRecoverUserPasswordPage(){


  const captcha : string = 'HE7L00'

  const route = useRouter()

  const [captchaVerify, setCaptchaVerify] = useState('');
  const [form, setForm] = useState({
    lastName: '',
    ssn: '',
    dob: '',
    captchaInput: '',
  });

  const [showCredentialError, setShowCredentialError] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [ssnLengthError, setSsnLengthError] = useState(false)

  const isFormValid = form.lastName && form.ssn && form.dob && form.captchaInput;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleValidate = () => {

    if(form.ssn.length < 5){
      setSsnLengthError(true);
      return;
    }

    const staticCredentials = {
      lastName: 'white',
      ssn: '12345',
      dob: '2025-10-01',
    };

    const isCredentialValid =
      form.lastName === staticCredentials.lastName &&
      form.ssn === staticCredentials.ssn &&
      form.dob === staticCredentials.dob;

    const isCaptchaValid = form.captchaInput === captcha;

    if (!isCredentialValid) {
      setShowCredentialError(true);
      setCaptchaVerify(
        'The credentials you entered do not match our records. Please validate your information and try again. For additional assistance, please contact customer service at 1-877-891-7827.'
      );
    } else {
      setShowCredentialError(false);
    }

    if (!isCaptchaValid) {
      setShowCaptchaError(true);
      setCaptchaVerify('Please enter verification code shown below.');
    } else {
      setShowCaptchaError(false);
    }

    if (isCredentialValid && isCaptchaValid) {
      setCaptchaVerify('');
      route.push('/login')
    }
  };

  return (
    <div className="p-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="Forgot User ID?"
      >
        <div className="flex flex-col p-6 sm:gap-4">
          {captchaVerify && (showCredentialError || showCaptchaError) && (
            <CustomAlert type="error" description={captchaVerify} />
          )}

          <div className="flex justify-end ">
            <b>
              <span className="text-[var(--text-error)] px-1">*</span>Required Fields
            </b>
          </div>

          <Card className="customCard w-full md:p-6 px-6 py-3 flex flex-col sm:flex-row gap-3">
            <div className="sm:w-1/2 w-full">
              <InputField
                label="Last Name"
                mandantory={true}
                error={showCredentialError ? '' : undefined}
                onChange={handleChange}
                name="lastName"
                value={form.lastName}
                className={`${showCredentialError ? "text-[var(--text-error)]": ""}`}
              />
            </div>

            <div className="sm:w-1/2 w-full">
               <InputField
                 label="Last 5 Digits of SSN "
                 mandantory={true}
                 error={
                  ssnLengthError
                   ? 'SSN must contain 5 digits'
                   : showCredentialError
                   ? ''
                   : undefined
                 }
                 iconRight={ssnLengthError ? NotSecure : '' }
                 className={`${
                  ssnLengthError || showCredentialError ? 'text-[var(--text-error)]' : ''
                 }`}
                 onChange={handleChange}
                 name="ssn"
                 type="password"
                 maxLength={5}
                 value={form.ssn}
                />
            </div>
          </Card>

          <Card className="customCard w-full md:p-6 px-6 flex gap-3">
            <div className="w-full sm:w-1/2">
              <InputField
                label="Date of Birth"
                mandantory={true}
                className={`${showCredentialError ? "text-[var(--text-error)]": ""}`}
                error={showCredentialError ? '' : undefined}
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />
              {/* <DatePicker /> */}
            </div>
          </Card>

          <Card className="customCard sm:p-6 px-6 py-4 flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="px-[12px] py-1 text-xl bg-[#000f73] text-white">{captcha}</div>

                <Button className="!p-1 !bg-transparent">
                  <Image src={Relode} alt="relode-img" />
                </Button>
              </div>

              <div className='w-1/2'>
                <InputField
                placeholder="Enter Captcha Code"
                value={form.captchaInput}
                name="captchaInput"
                onChange={handleChange}
                error={showCaptchaError ? '' : undefined}
                className={showCaptchaError ? 'text-[var(--text-error)]' : ''}
                iconRight={showCaptchaError ? NotSecure : ''}
                />
                
                </div>
            </div>

            <p
              className={`text-sm sm:w-1/2 w-full mt-1 ${
                showCaptchaError ? 'text-[var(--text-error)]' : ''
              }`}
            >
              Please enter the string as shown above before clicking on &quot;Validate&quot;
            </p>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">Cancel</Button>

            <Button
              variant={isFormValid ? 'primary' : 'disable'}
              onClick={handleValidate}
            >
              Validate
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
