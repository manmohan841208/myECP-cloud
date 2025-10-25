import Cookies from 'js-cookie';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Session {
  token: string;
  //   user: User;
}

export const setSession = (token: string): void => {
  const expiryDate = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now
  Cookies.set('token', token, { expires: expiryDate });
  //   localStorage.setItem('user', JSON.stringify(user));
};

export const getSession = (): Session | null => {
  const token = Cookies.get('token');
  //   const userString = localStorage.getItem('user');
  if (token) {
    try {
      //   const user: User = JSON.parse(userString);
      return { token };
    } catch {
      return null;
    }
  }
  return null;
};

export const clearSession = (): void => {
  Cookies.remove('token');
  localStorage.removeItem('user');
};
