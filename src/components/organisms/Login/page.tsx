'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@/components/atoms/Card';
import Image from '@/components/atoms/Image';
import {
  Tooltip,
  DummyCardImage,
  PointsImg,
  RewardImg,
  BannerImage,
  BannerImage2,
  BlackEyeClose,
  BlackEyeOpen,
} from '@/assets/svg';
import Button from '@/components/atoms/Button';
import { InputField } from '@/components/atoms/InputField';
import Link from 'next/link';
import CustomAlert from '@/components/atoms/AlertMessage';
import Carousel from '@/components/atoms/Carousal';
import CustomCheckbox from '@/components/atoms/Checkbox';
import { DynamicTooltip } from '@/components/atoms/Tooltip';
import { useRouter } from 'next/navigation';
import {
  setUserID,
  setPassword,
  setRememberMe,
} from '@/store/slices/loginSlice';
import { useLoginMutation } from '@/store/services/authApi';
import {
  USER_ID_LABEL,
  USER_PASSWORD_LABEL,
  LOGIN_BTN,
  FORGOT,
  FORGOT_PASSWORD,
  NEW_TO_MYECP,
  PLEASE_REGISTER_HERE,
  REMEMBER_USER_ID,
  MILITARY_STAR,
  APPLY_NOW,
  LEARN_MORE,
  SEE_REWARDS_TERMS_AND_CONDITIONS,
} from '@/constants/loginConstants';
import { useAuth } from '@/context/AuthProvider';
import { getCookie, removeCookie, setCookie } from '@/components/utils/cookies';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/schemas/loginSchema';
import { Loader } from '@/components/atoms/Loader';
import {
  login as loggedIn,
  setAuthFromStorage,
} from '@/store/slices/authSlice';
import { useGetPromotionsQuery } from '@/store/services/bannerPromotionsApi';
import { generatePromotionImages } from '@/components/molecules/PromotionBanners';
import maskUserId from '@/utils/maskUserId';

const Login = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { UserName, Password, rememberMe } = useSelector(
    (state: any) => state.login,
  );
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: promotionData } = useGetPromotionsQuery(1);
  const [images, setImages] = useState<ReactElement[]>([]);
  const [originalId, setOriginalId] = useState(getCookie('userName') || '');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      // UserName: getCookie('userName') ? maskUserId(getCookie('userName')) : '', // 👈 set your default value
      UserName: (() => {
        return originalId ? maskUserId(originalId) : '';
      })(),
    },
  });

  useEffect(() => {
    const userNameCookie: any = getCookie('userName');
    if (userNameCookie) {
      setOriginalId(userNameCookie);
      dispatch(setRememberMe(true));
    } else if (!userNameCookie) {
      dispatch(setRememberMe(false));
      removeCookie('userName');
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && promotionData) {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/promotion-images?id=';
      const generatedImages = generatePromotionImages(promotionData, baseUrl);
      setImages(generatedImages);
    }
  }, [promotionData, isLoading]);

  const router = useRouter();

  const remeberDeviceId = localStorage.getItem('rememberDevice');

  const handleLogin = async (data: any) => {
    try {
      const userNameToSend = originalId || data.UserName;

      const result: any = await loginUser({
        UserName: userNameToSend,
        Password: data.password,
        IsSecurityQuestionNeeded: !remeberDeviceId,
      }).unwrap();

      // Store credentials in Redux
      dispatch(setUserID(userNameToSend));
      dispatch(setPassword(data.password));

      // Persist user info and token
      localStorage.setItem('userInfo', JSON.stringify(result));
      localStorage.setItem('token', result?.Token);

      // Handle remember me
      if (rememberMe) {
        setCookie('userName', userNameToSend, 30 * 24 * 60 * 60); // 30 days
      } else {
        dispatch(setUserID(''));
        removeCookie('userName');
      }

      // Handle login flow
      if (result?.IsSecurityQuestionsNeeded) {
        router.push('/security-questions');
      } else if (result?.Is2FANeeded) {
        router.push('/login/2FA');
      } else {
        login(result?.Token);
        dispatch(setAuthFromStorage(result?.Token));
        dispatch(loggedIn());
        router.push('/account-summary');
      }
    } catch (err: any) {
      const message =
        err.data?.Message ||
        err.data?.message ||
        'Login failed. Please try again.';
      setShowError(true);
      setErrorMessage(message);
    }
  };

  return (
    // Center horizontally (by width) on all screens while keeping max-width:1152px
    <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-4">
      {isLoading && <Loader className="mx-auto mb-4" />}
      <section className="flex w-full gap-4">
        <Card className="flex h-[410px] w-full flex-col justify-between !p-3 lg:max-w-[373px]">
          <div>
            {showError && (
              <CustomAlert
                type="error"
                description={errorMessage}
                className="mb-2"
              />
            )}
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit((data: any) => handleLogin(data))}
            >
              <div className="flex flex-col gap-1">
                <InputField
                  label={USER_ID_LABEL}
                  {...register('UserName', {
                    onChange: () => {
                      setShowError(false);
                      setErrorMessage('');
                    },
                  })}
                  autoFocus={originalId ? false : true}
                  name="UserName"
                  className="w-full"
                  // error={errors.UserName?.message}
                />
                {/* {errors.UserName && (
                  <p className="text-red-500">{errors.UserName.message}</p>
                )} */}
                <div className="flex items-center justify-end gap-1">
                  {FORGOT}
                  <Link
                    href="/forgot-userid"
                    className="text-sm text-[var(--color-link)]"
                  >
                    {USER_ID_LABEL}
                  </Link>
                  <DynamicTooltip
                    side="right"
                    align="center"
                    className="w-[120px] rounded-[4px] bg-black"
                    content="You may recover your User ID"
                  >
                    <Image
                      src={Tooltip}
                      alt="tooltip icon"
                      className="hidden lg:block"
                    />
                  </DynamicTooltip>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <InputField
                  label={USER_PASSWORD_LABEL}
                  autoFocus={originalId ? true : false}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full"
                  {...register('password')}
                  iconRight={showPassword ? BlackEyeClose : BlackEyeOpen}
                  onIconClick={() => setShowPassword((prev) => !prev)}
                />
                <div className="flex items-center justify-end gap-1">
                  {FORGOT}
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[var(--color-link)]"
                  >
                    {FORGOT_PASSWORD}
                  </Link>
                  <DynamicTooltip
                    side="right"
                    align="center"
                    className="w-[120px] rounded-[4px] bg-black"
                    content="You may recover your Password"
                  >
                    <Image
                      src={Tooltip}
                      alt="tooltip icon"
                      className="hidden lg:block"
                    />
                  </DynamicTooltip>
                  {/* </div> */}
                </div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-1">
                  <CustomCheckbox
                    id="remember"
                    label={REMEMBER_USER_ID}
                    checked={rememberMe}
                    onChange={() => {
                      dispatch(setRememberMe(!rememberMe));
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant={!isLoading || isValid ? 'primary' : 'disable'}
                  className="h-10"
                  disabled={isLoading || !isValid}
                >
                  {LOGIN_BTN}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-2 text-center text-sm">
            <div className="flex flex-col items-center justify-center gap-1 md:flex-row">
              {NEW_TO_MYECP}{' '}
              <p className="flex items-center justify-center gap-1">
                Please
                <Link
                  href="/create-profile"
                  className="text-sm text-[var(--color-link)]"
                >
                  {PLEASE_REGISTER_HERE}
                </Link>
              </p>
              <DynamicTooltip
                side="right"
                align="center"
                className="w-[152px] rounded-[4px] bg-black"
                content="Your MyECP profile is unique to MyECP.com"
              >
                <Image
                  src={Tooltip}
                  alt="tooltip icon"
                  className="hidden lg:block"
                />
              </DynamicTooltip>
            </div>
          </div>
        </Card>

        <Card className="relative hidden h-[410px] w-full overflow-hidden !p-0 shadow-lg lg:block">
          <Carousel
            images={images}
            autoScroll
            interval={3000}
            className="rounded-lg"
          />
        </Card>
      </section>

      <section className="w-full">
        <Card className="h-full w-full px-4 lg:max-h-[300px]">
          <div className="max-h-9 py-2">
            <h1 className="!text-base">{MILITARY_STAR}</h1>
          </div>

          {/* <p className='text-sm text-black hidden sm:text-[12px] sm:block'>
            </p> */}
          <div className="hidden w-full text-white sm:block lg:hidden">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            maxime! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dolorum, quo deleniti itaque cupiditate vero nihil blanditiis
            exercitationem, nisi
          </div>

          <div className="flex w-full flex-col gap-6 pb-[14px] lg:flex-row lg:justify-evenly lg:gap-2">
            {/* Column 1 - Dummy Card Image + Button + Learn More */}
            <div className="flex max-h-[250px] flex-col items-center justify-between md:basis-1/3">
              <div className="flex max-h-[182px] max-w-[240px] flex-col items-center justify-center">
                <Image
                  src={DummyCardImage}
                  alt="dummy-card"
                  className="max-h-[182px] max-w-[240px]"
                />
              </div>
              <div className="flex max-h-10 w-full items-center justify-center">
                <Button variant={'primary'} className="max-w-[97px]">
                  {APPLY_NOW}
                </Button>
              </div>
              <Link href="#" className="text-sm text-[var(--color-link)]">
                {LEARN_MORE}
              </Link>
            </div>

            {/* Column 2 - Points Image + Terms Link */}
            <div className="flex flex-col items-center justify-between md:basis-1/3">
              <div className="flex max-h-[246px] max-w-[384px] flex-col items-center justify-center">
                <div className="max-h-[222px] max-w-[331px]">
                  <Image
                    src={PointsImg}
                    alt="points-img"
                    className="max-h-[222px]"
                  />
                </div>

                <Link href="#" className="text-[var(--color-link)]">
                  {SEE_REWARDS_TERMS_AND_CONDITIONS}
                </Link>
              </div>
            </div>

            {/* Column 3 - Reward Image */}
            <div className="flex max-h-[243px] items-center justify-center md:basis-1/3">
              <div className="max-h-[243px] max-w-[304px]">
                <Image
                  src={RewardImg}
                  alt="reward-img"
                  className="max-h-[243px] max-w-[304px]"
                />
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Login;
