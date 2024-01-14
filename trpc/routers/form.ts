import { createFormSchema } from '@/schemas/create-form';
import { protectedProcedure, router } from '../procedures';
import * as z from 'zod';

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
      include: {
        user: true,
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      return await ctx.db.form.findFirst({
        where: {
          id: input.formId,
          userId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      return await ctx.db.form.delete({
        where: {
          id: input.formId,
          userId,
        },
      });
    }),

  save: protectedProcedure
    .input(z.object({ formId: z.string(), fields: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      return await ctx.db.form.update({
        where: {
          id: input.formId,
          userId,
        },
        data: {
          fields: input.fields,
        },
      });
    }),

  publish: protectedProcedure
    .input(z.object({ formId: z.string(), fields: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;

      return await ctx.db.form.update({
        where: {
          id: input.formId,
          userId,
        },
        data: {
          published: true,
          fields: input.fields,
        },
      });
    }),
});
