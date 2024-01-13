import { publicProcedure, router } from '../procedures';
import { formRouter } from './form';

export const appRouter = router({
  healthz: publicProcedure.query(async () => {
    return `health ok`;
  }),
  form: formRouter,
});

export type AppRouter = typeof appRouter;
