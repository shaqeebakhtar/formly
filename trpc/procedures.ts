import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuth = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);
