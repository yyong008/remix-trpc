import { z } from 'zod';
import { t } from '../utils';

export default t.router({
  create: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
        // console.log("xxx", ctx, input)
      return { ...input }
    }),
  login: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //
    }),
})
