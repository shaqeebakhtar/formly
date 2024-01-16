'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session.user) {
    typeof window !== 'undefined' && router.push('/register');
  }

  if (session && session.user) {
    typeof window !== 'undefined' && router.push('/forms');
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <Button>
        <Link href={'/register'}>Create/Login</Link>
      </Button>
    </div>
  );
};

export default Home;
