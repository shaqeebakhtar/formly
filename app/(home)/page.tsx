'use client';

import { api } from '@/lib/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    router.push('/register');
  } else {
    router.push('/forms');
  }

  return <div></div>;
};

export default Home;
