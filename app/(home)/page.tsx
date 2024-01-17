import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/register');
  }

  if (session && session.user) {
    redirect('/forms');
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
