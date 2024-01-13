import { authOptions } from '@/lib/auth-options';
import type { inferAsyncReturnType } from '@trpc/server';
import { Session, getServerSession } from 'next-auth';
import { db } from '@/lib/db';

export const createContext = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  return {
    user: session?.user,
    db,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
