'use client';

import React, { ReactNode, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { api } from '@/lib/trpc';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getBaseURL } from '@/lib/utils';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseURL()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <SessionProvider>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </api.Provider>
    </SessionProvider>
  );
}
