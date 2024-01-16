'use client';

import { api } from '@/lib/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.user) {
      router.push('/register');
    } else {
      router.push('/forms');
    }
  }, [router, session]);

  return <div></div>;
};

export default Home;
