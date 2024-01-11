'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

const Home = () => {
  const helloQuery = trpc.hello.greeting.useQuery({
    name: 'shaqeeb',
  });

  return (
    <div>
      <p className="bg-red-500">Hi {helloQuery.data}</p>
      <Button>Test</Button>
    </div>
  );
};

export default Home;
