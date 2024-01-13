'use client';

import { api } from '@/lib/trpc';

const Home = () => {
  const healthz = api.healthz.useQuery();

  return <p>{healthz.data}</p>;
};

export default Home;
