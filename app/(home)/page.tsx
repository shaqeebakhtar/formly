'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/trpc';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.user) {
      typeof window !== 'undefined' && router.push('/register');
    } else {
      typeof window !== 'undefined' && router.push('/forms');
    }
  }, [router, session]);

  return (
    <div className="grid place-items-center min-h-screen">
      <Button>
        <Link href={'/register'}>Create/Login</Link>
      </Button>
    </div>
  );
};

export default Home;
