import { createFormSchema } from '@/schemas/create-form';
import { protectedProcedure, router } from '../procedures';

export const formRouter = router({
  create: protectedProcedure
    .input(createFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      return await ctx.db.form.create({
        data: {
          name: input.name,
          userId,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    return await ctx.db.form.findMany({
      where: {
        userId,
      },
    });
  }),
});
