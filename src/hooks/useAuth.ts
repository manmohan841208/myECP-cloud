import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from '@/lib/session';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push('/login');
    }
  }, []);
};
