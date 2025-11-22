'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthProviderProps {
  children: ReactNode;
}

const publicRoutes = ['/login', '/signup'];

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait for user status to be determined
    }

    const isPublicRoute = publicRoutes.includes(pathname);

    if (user && isPublicRoute) {
      router.push('/'); // If logged in and on a public route, redirect to home
    } else if (!user && !isPublicRoute) {
      router.push('/login'); // If not logged in and not on a public route, redirect to login
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading || (!user && !publicRoutes.includes(pathname)) || (user && publicRoutes.includes(pathname))) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
