import { router } from '../procedures';
import { helloRouter } from './hello';

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
