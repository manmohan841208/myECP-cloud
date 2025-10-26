'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct import for App Router
import { getSession } from '@/lib/session';
import { Loader } from '@/components/atoms/Loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session?.token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return <Loader className="mx-auto mb-4" />;

  return <>{children}</>;
};

export default ProtectedRoute;
