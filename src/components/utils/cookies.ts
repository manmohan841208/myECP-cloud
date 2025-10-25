// utils/cookieUtils.ts
import Cookies from 'js-cookie';

export const setCookie = (
  name: string,
  value: string,
  maxAgeSeconds = 3600,
) => {
  console.log('Setting cookie:', { name, value, maxAgeSeconds });
  Cookies.set(name, value, {
    expires: maxAgeSeconds,
    secure: true,
    sameSite: 'Strict',
  });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
