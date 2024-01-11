import { publicProcedure, router } from '../procedures';
import * as z from 'zod';

export const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async (ctx) => {
      return `hello ${ctx.input.name}`;
    }),
});
